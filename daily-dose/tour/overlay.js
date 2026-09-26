// Tour overlay, injected into every page of the tour's browser context with
// addInitScript, so it survives navigation and also runs in the sign-in popup.
// It draws only (caption card, fake pointer, explore bar, notice bar) and
// catches the presenter's SPACE / RIGHT ARROW while armed. The Node side
// (tour.mjs) drives it through window.__tour and polls for the go flag.
(() => {
  if (window.__tour) return;
  const FONT = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif';
  const CSS = `
  #tour-host{position:fixed;inset:0;width:100vw;height:100vh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:none;z-index:2147483647;font-family:${FONT}}
  #tour-host::backdrop{display:none}
  #tour-scrim{position:fixed;inset:0;background:rgba(8,8,10,.55);opacity:0;transition:opacity .25s;display:flex;align-items:center;justify-content:center}
  #tour-scrim.on{opacity:1}
  #tour-card{max-width:62%;padding:34px 44px;border-radius:14px;background:rgba(14,14,18,.96);box-shadow:0 18px 60px rgba(0,0,0,.6);text-align:center}
  #tour-main{color:#fff;font:600 34px/1.28 ${FONT};margin:0}
  #tour-sub{color:#c9c6c0;font:400 21px/1.4 ${FONT};margin:14px 0 0}
  #tour-hint{color:#7f7c76;font:500 13px/1 ${FONT};text-transform:uppercase;letter-spacing:.08em;margin:22px 0 0}
  #tour-explore{position:fixed;top:0;left:0;right:0;background:#e0138c;border-bottom:3px solid #8a0a55;box-shadow:0 3px 14px rgba(0,0,0,.35);color:#fff;font:600 17px/1.2 ${FONT};letter-spacing:.03em;padding:9px 16px 10px;display:none}
  #tour-notice{position:fixed;left:0;right:0;bottom:0;background:linear-gradient(to top,rgba(10,10,12,.94),rgba(10,10,12,.78));color:#fff;font:500 26px/1.3 ${FONT};padding:18px 28px;text-align:center;display:none}
  #tour-notice.top{bottom:auto;top:0;background:linear-gradient(to bottom,rgba(10,10,12,.94),rgba(10,10,12,.78))}
  #tour-pointer{position:fixed;left:0;top:0;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;border:2.5px solid #fff;background:rgba(255,255,255,.18);box-shadow:0 0 0 2px rgba(0,0,0,.45),0 0 14px rgba(255,255,255,.55);box-sizing:border-box;display:none}
  .tour-dot{position:fixed;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:#fff;opacity:.8;transition:opacity .5s}
  .tour-ripple{position:fixed;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;border:3px solid #7ee0a0;box-sizing:border-box;animation:tour-ripple .45s ease-out forwards}
  @keyframes tour-ripple{from{transform:scale(.4);opacity:1}to{transform:scale(2.4);opacity:0}}
  .tour-ring{position:fixed;border-radius:6px;box-sizing:border-box;transition:opacity .3s}
  .tour-ring.flash{border:3px solid #7ee0a0;box-shadow:0 0 0 4px rgba(126,224,160,.25);animation:tour-flash .7s ease-in-out}
  @keyframes tour-flash{0%,100%{opacity:0}30%,70%{opacity:1}}
  .tour-ring.field{border:2.5px solid #ffd166;box-shadow:0 0 0 6px rgba(255,209,102,.22)}
  @media (max-width:500px){#tour-card{max-width:88%;padding:22px 22px}#tour-main{font-size:22px}#tour-sub{font-size:15px}#tour-notice{font-size:17px}#tour-explore{font-size:14px}}
  `;
  const S = { armed: false, go: false, exploring: false, swallowUntil: 0, pos: null };
  let host;
  const el = (id, tag = 'div') => { const e = document.createElement(tag); e.id = id; return e; };

  function ensure() {
    if (host?.isConnected) return host;
    if (!document.body) return null;
    const style = el('tour-style', 'style'); style.textContent = CSS; document.head.appendChild(style);
    host = el('tour-host'); host.setAttribute('popover', 'manual');
    const scrim = el('tour-scrim'); scrim.style.display = 'none';
    const card = el('tour-card');
    card.append(el('tour-main', 'p'), el('tour-sub', 'p'), el('tour-hint', 'p'));
    scrim.append(card);
    host.append(scrim, el('tour-explore'), el('tour-notice'), el('tour-pointer'));
    document.body.appendChild(host);
    host.querySelector('#tour-explore').textContent = 'Explore: press space to continue';
    raise();
    if (S.pos) place(S.pos.x, S.pos.y);
    return host;
  }
  // The app's reader is a modal <dialog> in the top layer. Re-showing the
  // popover puts the overlay back above it (top layer is ordered by insertion).
  function raise() {
    if (!host) return;
    try {
      const dialogOpen = document.querySelector('dialog[open]');
      if (host.matches(':popover-open') && !dialogOpen) return;
      if (host.matches(':popover-open')) host.hidePopover();
      host.showPopover();
    } catch { host.removeAttribute('popover'); /* no popover support: fixed + z-index still applies */ }
  }
  const $ = id => { ensure(); return host?.querySelector('#' + id); };

  function caption(main, sub = '') {
    const scrim = $('tour-scrim'); if (!scrim) return false;
    $('tour-main').textContent = main;
    $('tour-sub').textContent = sub; $('tour-sub').style.display = sub ? '' : 'none';
    $('tour-hint').textContent = 'space ▸';
    raise();
    scrim.style.display = 'flex';
    requestAnimationFrame(() => requestAnimationFrame(() => scrim.classList.add('on')));
    return true;
  }
  function hideCaption() {
    const scrim = $('tour-scrim'); if (!scrim) return;
    scrim.classList.remove('on');
    setTimeout(() => { if (!scrim.classList.contains('on')) scrim.style.display = 'none'; }, 260);
  }
  function explore(on) {
    const bar = $('tour-explore'); if (!bar) return;
    if (on) raise();
    if (!on && S.exploring) S.swallowUntil = Date.now() + 1500;
    S.exploring = on; bar.style.display = on ? 'block' : 'none';
  }
  function notice(text, top = false) {
    const bar = $('tour-notice'); if (!bar) return;
    raise();
    bar.textContent = text || ''; bar.classList.toggle('top', !!top); bar.style.display = text ? 'block' : 'none';
  }

  function place(x, y) {
    const p = $('tour-pointer'); if (!p) return;
    p.style.display = 'block'; p.style.transform = `translate(${x}px,${y}px)`; S.pos = { x, y };
  }
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function glide(x, y, ms = 450) {
    ensure(); raise();
    const from = S.pos || { x: innerWidth / 2, y: innerHeight * .8 };
    return new Promise(resolve => {
      const t0 = performance.now(); let frame = 0;
      const step = now => {
        const t = Math.min(1, (now - t0) / ms), k = ease(t);
        const cx = from.x + (x - from.x) * k, cy = from.y + (y - from.y) * k;
        place(cx, cy);
        if (++frame % 3 === 0 && t < 1) dot(cx, cy);
        if (t < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });
  }
  function dot(x, y) {
    const d = document.createElement('div'); d.className = 'tour-dot';
    d.style.left = x + 'px'; d.style.top = y + 'px'; host.appendChild(d);
    requestAnimationFrame(() => { d.style.opacity = '0'; });
    setTimeout(() => d.remove(), 600);
  }
  function ripple(x, y) {
    ensure(); raise();
    const r = document.createElement('div'); r.className = 'tour-ripple';
    r.style.left = x + 'px'; r.style.top = y + 'px'; host.appendChild(r);
    setTimeout(() => r.remove(), 500);
  }
  function ring(box, kind = 'flash', ms = 700) {
    ensure(); raise();
    const r = document.createElement('div'); r.className = 'tour-ring ' + kind; const pad = 4;
    Object.assign(r.style, { left: box.x - pad + 'px', top: box.y - pad + 'px', width: box.width + 2 * pad + 'px', height: box.height + 2 * pad + 'px' });
    host.appendChild(r);
    setTimeout(() => { r.style.opacity = '0'; setTimeout(() => r.remove(), 320); }, ms);
  }

  const isGoKey = e => e.code === 'Space' || e.key === ' ' || e.key === 'ArrowRight';
  addEventListener('keydown', e => {
    if (!isGoKey(e)) return;
    if (S.armed) { e.preventDefault(); e.stopImmediatePropagation(); S.armed = false; S.go = true; S.swallowUntil = Date.now() + 1500; }
    else if (S.exploring || Date.now() < S.swallowUntil) {
      // A held key repeats keydown; never let it reach the app mid-transition.
      if (e.repeat) { e.preventDefault(); e.stopImmediatePropagation(); }
    }
  }, true);
  addEventListener('keyup', e => {
    if (!isGoKey(e)) return;
    // A focused button activates on keyup of space, so swallow it too.
    if (S.exploring || S.armed || S.go || Date.now() < S.swallowUntil) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);

  window.__tour = {
    ensure: () => !!ensure(), raise, caption, hideCaption, explore, notice, place, glide, ripple, ring,
    arm() { ensure(); S.armed = true; },
    disarm() { S.armed = false; S.go = false; S.swallowUntil = Date.now() + 1500; },
    takeGo() { const g = S.go; S.go = false; return g; },
    setPos(p) { S.pos = p; },
    getPos: () => S.pos,
  };
})();
