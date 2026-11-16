// The homescreen's dock and sheets. Served as a file from opus.ro so the
// Content-Security-Policy's `script-src 'self'` allows it.
//
// Without this file every icon is a plain link (the app's own site, the
// mailto) and nothing is lost. With it:
//
//   - on a Mac, the dock magnifies under the pointer and every icon catches
//     the light where the pointer is; on an Android phone, where the tilt is
//     available without asking, the light follows the tilt instead;
//   - tapping an app lifts its icon out of the dock into a sheet (a card on a
//     desktop, a sheet from the bottom edge on a phone, which can be pulled
//     back down), and closing sends the icon home;
//   - every sheet has an address (opus.ro/#loop), and the back button or
//     gesture closes it.
(function () {
	var home = document.querySelector('[data-home]');
	if (!home) return;

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
	var phone = window.matchMedia('(max-width: 640px)');

	// The curve iOS sheets move on: quick to leave, long to settle.
	var EASE_OUT = 'cubic-bezier(0.32, 0.72, 0, 1)';
	var EASE_IN = 'cubic-bezier(0.4, 0, 0.9, 0.6)';
	var EASE_SOFT = 'cubic-bezier(0.4, 0, 0.2, 1)';

	function clamp(v, lo, hi) {
		return Math.max(lo, Math.min(hi, v));
	}

	/* ---- Dock: magnification and light ---------------------------------- */

	var tray = home.querySelector('[data-dock-tray]');
	var items = Array.prototype.slice.call(home.querySelectorAll('[data-dock-item]'));
	var icons = items.map(function (item) {
		return item.querySelector('.app__icon');
	});

	var MAX_SCALE = 1.5;
	var RADIUS = 150; // px either side of the pointer that feel it
	var pointerX = null;
	var centres = [];
	var scales = items.map(function () {
		return 1;
	});
	var frame = 0;

	function measureCentres() {
		// Measured at rest, so the targets do not chase their own growth.
		centres = items.map(function (item) {
			var r = item.getBoundingClientRect();
			return r.left + r.width / 2;
		});
	}

	function tick() {
		frame = 0;
		var moving = false;
		for (var i = 0; i < items.length; i++) {
			var target = 1;
			if (pointerX !== null && !reduceMotion.matches) {
				var d = Math.abs(pointerX - centres[i]);
				if (d < RADIUS) target = 1 + (MAX_SCALE - 1) * (0.5 + 0.5 * Math.cos((Math.PI * d) / RADIUS));
			}
			var next = scales[i] + (target - scales[i]) * 0.22;
			if (Math.abs(next - target) < 0.002) next = target;
			else moving = true;
			if (next !== scales[i]) {
				scales[i] = next;
				items[i].style.setProperty('--s', next.toFixed(4));
			}
		}
		if (moving) frame = requestAnimationFrame(tick);
	}
	function schedule() {
		if (!frame) frame = requestAnimationFrame(tick);
	}

	if (tray) {
		tray.addEventListener('pointerenter', function (e) {
			if (e.pointerType !== 'mouse' || !finePointer.matches) return;
			if (scales.every(function (s) { return s === 1; })) measureCentres();
		});
		tray.addEventListener('pointermove', function (e) {
			if (e.pointerType !== 'mouse' || !finePointer.matches) return;
			if (!centres.length) measureCentres();
			pointerX = e.clientX;
			schedule();
		});
		tray.addEventListener('pointerleave', function () {
			pointerX = null;
			schedule();
		});
		window.addEventListener('resize', function () {
			centres = [];
		});
	}

	function setLight(x, y) {
		for (var i = 0; i < icons.length; i++) {
			var icon = icons[i];
			if (!icon) continue;
			var r = icon.getBoundingClientRect();
			var nx = (x - (r.left + r.width / 2)) / (r.width * 1.2);
			var ny = (y - (r.top + r.height / 2)) / (r.height * 1.2);
			icon.style.setProperty('--hx', clamp(50 + nx * 30, 8, 92) + '%');
			icon.style.setProperty('--hy', clamp(50 + ny * 30, 8, 92) + '%');
		}
	}
	var lightFrame = 0;
	window.addEventListener('pointermove', function (e) {
		if (e.pointerType !== 'mouse' || reduceMotion.matches) return;
		if (lightFrame) return;
		lightFrame = requestAnimationFrame(function () {
			lightFrame = 0;
			setLight(e.clientX, e.clientY);
		});
	});

	// Tilt, only where it needs no permission prompt: asking a visitor for
	// their motion sensors to make an icon shine is not a fair trade.
	if (
		!finePointer.matches &&
		'DeviceOrientationEvent' in window &&
		typeof window.DeviceOrientationEvent.requestPermission !== 'function'
	) {
		window.addEventListener(
			'deviceorientation',
			function (e) {
				if (reduceMotion.matches || typeof e.gamma !== 'number') return;
				var tx = clamp(e.gamma / 35, -1, 1);
				var ty = clamp((e.beta - 45) / 45, -1, 1);
				for (var i = 0; i < icons.length; i++) {
					if (!icons[i]) continue;
					icons[i].style.setProperty('--hx', 50 + tx * 22 + '%');
					icons[i].style.setProperty('--hy', 50 + ty * 22 + '%');
				}
			},
			true,
		);
	}

	/* ---- Sheets ------------------------------------------------------------ */

	var sheets = {};
	Array.prototype.forEach.call(home.querySelectorAll('dialog[data-sheet]'), function (d) {
		sheets[d.getAttribute('data-sheet')] = d;
	});
	if (typeof HTMLDialogElement !== 'function' || !('showModal' in document.createElement('dialog'))) return;

	var current = null; // { id, sheet, source }
	var busy = false;

	function parts(sheet) {
		return {
			scrim: sheet.querySelector('[data-scrim]'),
			panel: sheet.querySelector('[data-panel]'),
			icon: sheet.querySelector('[data-sheet-icon]'),
			reveal: sheet.querySelectorAll('[data-reveal]'),
			video: sheet.querySelector('[data-video]'),
		};
	}

	function sourceFor(id) {
		return home.querySelector('.dock [data-icon="' + id + '"]');
	}

	// A copy of the sheet's icon that flies between the dock and the sheet in
	// the top layer, above the panel, so the panel's own clip and edges never
	// cut it off. `rest` is where the sheet's icon sits; the copy is laid out
	// there and moved from `a` to `b` with transforms only.
	function fly(sheet, icon, rest, a, b, timing) {
		var ghost = icon.cloneNode(true);
		ghost.removeAttribute('data-sheet-icon');
		ghost.setAttribute('aria-hidden', 'true');
		ghost.style.cssText =
			'position:fixed;margin:0;z-index:3;pointer-events:none;visibility:visible;' +
			'left:' + rest.left + 'px;top:' + rest.top + 'px;transform-origin:0 0;';
		sheet.appendChild(ghost);
		icon.style.visibility = 'hidden';
		function t(r) {
			return 'translate(' + (r.left - rest.left) + 'px, ' + (r.top - rest.top) + 'px) scale(' + r.width / rest.width + ')';
		}
		var anim = ghost.animate([{ transform: t(a) }, { transform: t(b) }], timing);
		anim.finished
			.catch(function () {})
			.then(function () {
				ghost.remove();
			});
		return anim;
	}

	function shifted(r, dy) {
		return { left: r.left, top: r.top + dy, width: r.width, height: r.height };
	}

	function finishAll(list) {
		return Promise.all(
			list.filter(Boolean).map(function (a) {
				return a.finished.catch(function () {});
			}),
		);
	}

	function open(id, opts) {
		opts = opts || {};
		var sheet = sheets[id];
		if (!sheet || busy || current) return;
		busy = true;
		var p = parts(sheet);
		var source = sourceFor(id);

		sheet.showModal();
		// Focus the sheet itself, not the close button, so nothing lights up.
		p.panel.setAttribute('tabindex', '-1');
		p.panel.focus({ preventScroll: true });

		current = { id: id, sheet: sheet, source: source };
		if (opts.push !== false) history.pushState({ sheet: id }, '', '#' + id);
		if (p.video && getComputedStyle(p.video.parentNode).display !== 'none') {
			p.video.play().catch(function () {});
		}
		p.panel.style.touchAction = phone.matches && p.panel.scrollHeight <= p.panel.clientHeight ? 'none' : '';

		var anims = [];
		anims.push(p.scrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'ease-out' }));

		if (reduceMotion.matches || opts.instant) {
			anims.push(p.panel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' }));
		} else {
			var to = p.icon.getBoundingClientRect();
			var from = source && source.offsetParent ? source.getBoundingClientRect() : null;
			var duration = phone.matches ? 560 : 620;

			if (phone.matches) {
				// The sheet rises from the bottom edge while the icon flies from
				// the dock to its place in the sheet's header. Same curve, same
				// length, so the icon travels in a straight line.
				var lift = p.panel.getBoundingClientRect().height + 24;
				anims.push(
					p.panel.animate([{ transform: 'translateY(' + lift + 'px)' }, { transform: 'translateY(0)' }], {
						duration: duration,
						easing: EASE_OUT,
					}),
				);
			} else {
				// The card opens out of its own icon while the icon flies in from
				// the dock to meet it.
				var pr = p.panel.getBoundingClientRect();
				var inset =
					'inset(' +
					(to.top - pr.top) + 'px ' +
					(pr.right - to.right) + 'px ' +
					(pr.bottom - to.bottom) + 'px ' +
					(to.left - pr.left) + 'px round 15px)';
				anims.push(
					p.panel.animate(
						[
							{ clipPath: inset, opacity: 0 },
							{ clipPath: inset, opacity: 1, offset: 0.12 },
							{ clipPath: 'inset(0px 0px 0px 0px round 24px)', opacity: 1 },
						],
						{ duration: duration, delay: 90, easing: EASE_OUT, fill: 'backwards' },
					),
				);
			}
			if (from) {
				var flight = fly(sheet, p.icon, to, from, to, { duration: duration - 40, easing: EASE_OUT });
				anims.push(flight);
				flight.finished.catch(function () {}).then(function () {
					p.icon.style.visibility = '';
				});
			}
			if (source) source.style.visibility = 'hidden';

			Array.prototype.forEach.call(p.reveal, function (el, i) {
				if (el.contains(p.icon)) {
					// The header's words, not the icon, fade in.
					var words = el.querySelector('.sheet__titles');
					if (words) el = words;
					else return;
				}
				anims.push(
					el.animate(
						[
							{ opacity: 0, transform: 'translateY(8px)' },
							{ opacity: 1, transform: 'none' },
						],
						{ duration: 460, delay: 200 + i * 55, easing: EASE_OUT, fill: 'backwards' },
					),
				);
			});
		}

		finishAll(anims).then(function () {
			busy = false;
		});
	}

	function close(opts) {
		opts = opts || {};
		if (!current || busy) return;
		busy = true;
		var sheet = current.sheet;
		var source = current.source;
		var p = parts(sheet);
		var dragged = opts.fromY || 0;

		var anims = [];
		anims.push(
			p.scrim.animate([{ opacity: getComputedStyle(p.scrim).opacity }, { opacity: 0 }], {
				duration: 280,
				easing: 'ease-in',
				fill: 'forwards',
			}),
		);

		if (reduceMotion.matches) {
			anims.push(p.panel.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards' }));
		} else {
			if (source) source.style.visibility = 'hidden';
			p.panel.style.transform = '';
			var to = p.icon.getBoundingClientRect();
			var visible = source && source.offsetParent;
			var from = visible ? source.getBoundingClientRect() : null;

			if (phone.matches) {
				var drop = p.panel.getBoundingClientRect().height + 24;
				var duration = 420;
				anims.push(
					p.panel.animate(
						[{ transform: 'translateY(' + dragged + 'px)' }, { transform: 'translateY(' + drop + 'px)' }],
						{ duration: duration, easing: EASE_OUT, fill: 'forwards' },
					),
				);
				if (from) {
					// From where the finger left the sheet, home to the dock.
					anims.push(fly(sheet, p.icon, to, shifted(to, dragged), from, { duration: duration, easing: EASE_OUT, fill: 'forwards' }));
				}
			} else {
				var pr = p.panel.getBoundingClientRect();
				var inset =
					'inset(' +
					(to.top - pr.top) + 'px ' +
					(pr.right - to.right) + 'px ' +
					(pr.bottom - to.bottom) + 'px ' +
					(to.left - pr.left) + 'px round 15px)';
				anims.push(
					p.panel.animate(
						[
							{ clipPath: 'inset(0px 0px 0px 0px round 24px)', opacity: 1 },
							{ clipPath: inset, opacity: 1, offset: 0.8 },
							{ clipPath: inset, opacity: 0 },
						],
						{ duration: 340, easing: EASE_IN, fill: 'forwards' },
					),
				);
				if (from) {
					anims.push(fly(sheet, p.icon, to, to, from, { duration: 480, easing: EASE_OUT, fill: 'forwards' }));
				}
			}
		}

		finishAll(anims).then(function () {
			sheet.close();
			anims.forEach(function (a) {
				a.cancel();
			});
			p.panel.style.transform = '';
			p.scrim.style.opacity = '';
			p.icon.style.visibility = '';
			if (p.video) p.video.pause();
			if (source) {
				source.style.visibility = '';
				// The icon lands with a small settle, as it does on a phone.
				if (!reduceMotion.matches) {
					source.animate([{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], {
						duration: 320,
						easing: EASE_SOFT,
					});
				}
			}
			current = null;
			busy = false;
		});
	}

	// Closing from the page goes back through history, so the address and
	// the back button always agree with what is on screen.
	function requestClose() {
		if (!current) return;
		if (history.state && history.state.sheet === current.id) history.back();
		else {
			close();
			if (location.hash) history.replaceState(null, '', location.pathname + location.search);
		}
	}

	window.addEventListener('popstate', function () {
		var id = location.hash.slice(1);
		if (current && current.id !== id) close();
		else if (!current && sheets[id]) open(id, { push: false });
	});

	home.addEventListener('click', function (e) {
		var opener = e.target.closest('[data-open]');
		if (opener && sheets[opener.getAttribute('data-open')]) {
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
			e.preventDefault();
			open(opener.getAttribute('data-open'));
		}
	});

	Object.keys(sheets).forEach(function (id) {
		var sheet = sheets[id];
		var p = parts(sheet);

		sheet.addEventListener('cancel', function (e) {
			e.preventDefault();
			requestClose();
		});
		sheet.addEventListener('click', function (e) {
			if (e.target === sheet || e.target === p.scrim) requestClose();
		});
		sheet.querySelector('[data-close]').addEventListener('click', requestClose);

		// Pull down to dismiss, on a phone.
		var startY = 0;
		var startT = 0;
		var dy = 0;
		var dragging = false;
		p.panel.addEventListener('pointerdown', function (e) {
			if (!phone.matches || busy || e.pointerType === 'mouse') return;
			if (e.target.closest('a, button')) return;
			if (p.panel.scrollTop > 0) return;
			dragging = true;
			startY = e.clientY;
			startT = performance.now();
			dy = 0;
			p.panel.setPointerCapture(e.pointerId);
		});
		p.panel.addEventListener('pointermove', function (e) {
			if (!dragging) return;
			var raw = e.clientY - startY;
			// Downwards follows the finger; upwards resists.
			dy = raw > 0 ? raw : -Math.pow(-raw, 0.6);
			p.panel.style.transform = 'translateY(' + dy + 'px)';
			var h = p.panel.offsetHeight;
			p.scrim.style.opacity = String(clamp(1 - dy / h, 0, 1));
		});
		function release() {
			if (!dragging) return;
			dragging = false;
			var v = dy / Math.max(1, performance.now() - startT);
			if (dy > p.panel.offsetHeight * 0.25 || (dy > 24 && v > 0.5)) {
				var from = dy;
				p.panel.style.transform = '';
				// Close from where the finger left it; the history step that
				// follows finds the sheet already closing and leaves it be.
				close({ fromY: from });
				if (history.state && history.state.sheet === id) history.back();
			} else {
				var back = p.panel.animate([{ transform: 'translateY(' + dy + 'px)' }, { transform: 'translateY(0)' }], {
					duration: 380,
					easing: EASE_OUT,
				});
				p.panel.style.transform = '';
				p.scrim.style.opacity = '';
				back.finished.catch(function () {});
			}
		}
		p.panel.addEventListener('pointerup', release);
		p.panel.addEventListener('pointercancel', release);
	});

	// Arriving at opus.ro/#loop opens Loop's sheet.
	var initial = location.hash.slice(1);
	if (sheets[initial]) {
		history.replaceState(null, '', location.pathname + location.search);
		requestAnimationFrame(function () {
			open(initial);
		});
	}
})();
