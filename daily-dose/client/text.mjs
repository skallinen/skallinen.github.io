export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// The manuscript uses inclusive [first column, first row, last column, last row] spans.
export function tableHtml(rows, spans = []) {
  return `<div class="table-scroll"><table>${rows.map((row, y) => `<tr>${row.map((cell, x) => {
    const span = spans.find(([x1, y1, x2, y2]) => x >= x1 && x <= x2 && y >= y1 && y <= y2);
    if (span && (x !== span[0] || y !== span[1])) return '';
    const attributes = span ? ` colspan="${span[2] - span[0] + 1}" rowspan="${span[3] - span[1] + 1}"` : '';
    return `<td${attributes}>${esc(cell)}</td>`;
  }).join('')}</tr>`).join('')}</table></div>`;
}

// Escapes text, then turns http(s) URLs into safe links that open in a new tab.
export function linkify(text) {
  return String(text ?? '').split(/(https?:\/\/[^\s<>"']+)/g).map((part, i) => {
    if (i % 2 === 0) return esc(part);
    const trail = part.match(/[.,;:!?)\]]+$/)?.[0] || '';
    const url = trail ? part.slice(0, -trail.length) : part;
    try { if (!['http:', 'https:'].includes(new URL(url).protocol)) return esc(part); } catch { return esc(part); }
    return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(url)}</a>${esc(trail)}`;
  }).join('');
}
