"""Export corrected anthology privately for the authenticated reading API."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from prose_formatting import apply_review
from poetry_formatting import apply_poetry_review
from typography_repairs import apply_typography_review
from fact_check_repairs import apply_fact_check_review, PENDING
from reader_metadata import apply_reader_metadata


def main():
    raw = {p.stem: json.loads(p.read_text()) for d in ('texts', 'availability-first/texts')
           for p in (ROOT / d).glob('[PSE][0-9][0-9].json')}
    texts, _ = apply_review(raw)
    texts, _ = apply_poetry_review(texts)
    texts, _ = apply_typography_review(texts)
    texts, _ = apply_fact_check_review(texts)
    rows = {r['id']: r for r in json.loads((ROOT / 'availability-first/selection.json').read_text())['records']}
    for ident, text in texts.items():
        if 'title' in text:
            rows[ident]['title'] = text['title']
    rows = apply_reader_metadata(rows)
    works = []
    for day in json.loads((ROOT / 'reading-plan.json').read_text())['schedule']:
        for category in ('poem', 'story', 'essay'):
            ident = day[category]
            r, t = rows[ident], texts[ident]
            works.append(dict(id=ident, day=day['day'], category=category, title=r['title'],
                              author=r['author'], country=r['reader_country'], year=r['reader_year'],
                              minutes=max(1, round(t['word_count'] / 225)), blocks=t['blocks'],
                              sourceNote=t['edition_note'], editorialHold=PENDING.get(ident),
                              textSha256=t['text_sha256']))
    assert len(works) == 150 and len({w['id'] for w in works}) == 150
    payload = dict(title='Daily Dose', subtitle='A Better Book Club Anthology',
                   edition='Corrected review edition — source checks remain', works=works)
    dest = Path(__file__).parent / 'data/anthology.json'
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n')
    print(f'Exported {len(works)} corrected works to private server data (not public/).')


if __name__ == '__main__':
    main()
