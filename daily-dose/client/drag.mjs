// Reorder a list by dragging an item's handle, with a finger, a pen or a mouse
// (pointer events; the handle has `touch-action: none` so a finger drags
// instead of scrolling). Like Bookrank's SortableJS list, without the library.
// The dragged item itself is never taken out of the page: its neighbours move
// around it, so the pointer and the keyboard focus stay on its handle.
// Near the top or bottom of the window the page scrolls along.

// Move `item` one place up (-1) or down (+1) among its siblings; true if it moved.
export function step(item, direction) {
  const other = direction < 0 ? item.previousElementSibling : item.nextElementSibling;
  if (!other) return false;
  if (direction < 0) item.after(other); else item.before(other);
  return true;
}

// Start a drag from a pointerdown on a handle inside `item`. `onMove` runs
// after every change of place, `onDrop(moved)` once at the end.
export function startDrag(event, item, { onMove = () => {}, onDrop = () => {} } = {}) {
  const list = item.parentElement, id = event.pointerId, start = [...list.children].indexOf(item);
  event.preventDefault();
  try { event.target.setPointerCapture?.(id); } catch { /* not capturable: document listeners still hear it */ }
  item.classList.add('is-dragging'); list.classList.add('is-sorting');
  let y = event.clientY, frame = 0, done = false;
  const mid = el => { const r = el.getBoundingClientRect(); return r.top + r.height / 2; };
  const place = () => {
    let moved = false;
    while (item.nextElementSibling && y > mid(item.nextElementSibling)) moved = step(item, 1) || moved;
    while (item.previousElementSibling && y < mid(item.previousElementSibling)) moved = step(item, -1) || moved;
    if (moved) onMove();
  };
  const edge = 72;
  const scroll = () => {
    const speed = y < edge ? -Math.ceil((edge - y) / 4) : y > innerHeight - edge ? Math.ceil((y - innerHeight + edge) / 4) : 0;
    if (speed) { scrollBy(0, speed); place(); }
    frame = requestAnimationFrame(scroll);
  };
  frame = requestAnimationFrame(scroll);
  const move = e => { if (e.pointerId !== id) return; e.preventDefault(); y = e.clientY; place(); };
  const end = e => {
    if (e.pointerId !== id || done) return;
    done = true; cancelAnimationFrame(frame);
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', end);
    document.removeEventListener('pointercancel', end);
    item.classList.remove('is-dragging'); list.classList.remove('is-sorting');
    onDrop([...list.children].indexOf(item) !== start);
  };
  document.addEventListener('pointermove', move, { passive: false });
  document.addEventListener('pointerup', end);
  document.addEventListener('pointercancel', end);
}
