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
