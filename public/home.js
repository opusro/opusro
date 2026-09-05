// The homescreen's feel. Served as a file so the Content-Security-Policy's
// `script-src 'self'` allows it; without it the screen still works: swiping
// between pages is native scroll snapping, and the dots simply do not move.
//
// Here: the page dots, mouse drag between pages, arrow keys, the dock
// magnifying under the pointer, and the light on tiles following the pointer
// (or, on a phone, the tilt of the device after the first touch).
(function () {
	var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
	var coarse = window.matchMedia('(hover: none), (pointer: coarse)');

	function clamp(v, lo, hi) {
		return Math.min(hi, Math.max(lo, v));
	}

	// -- Pages ------------------------------------------------------------------
	var pager = document.querySelector('[data-pager]');
	var dots = Array.prototype.slice.call(document.querySelectorAll('[data-dot]'));

	if (pager) {
		var pageCount = pager.children.length;

		function pageIndex() {
			return clamp(Math.round(pager.scrollLeft / pager.clientWidth), 0, pageCount - 1);
		}

		function goTo(i, instant) {
			pager.scrollTo({
				left: clamp(i, 0, pageCount - 1) * pager.clientWidth,
				behavior: instant || reduce.matches ? 'auto' : 'smooth',
			});
		}

		function updateDots() {
			var i = pageIndex();
			dots.forEach(function (d, k) {
				d.setAttribute('aria-current', k === i ? 'true' : 'false');
			});
		}

		var raf = 0;
		pager.addEventListener('scroll', function () {
			if (raf) return;
			raf = requestAnimationFrame(function () {
				raf = 0;
				updateDots();
			});
		});
		window.addEventListener('resize', function () {
			goTo(pageIndex(), true);
		});

		dots.forEach(function (d, k) {
			d.addEventListener('click', function () {
				goTo(k);
			});
		});

		// Arrow keys move pages when nothing else wants them.
		document.addEventListener('keydown', function (e) {
			var t = e.target;
			if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
			if (e.key === 'ArrowRight') goTo(pageIndex() + 1);
			else if (e.key === 'ArrowLeft') goTo(pageIndex() - 1);
		});

		// Mouse drag. Touch already swipes natively through scroll snapping.
		var dragging = false;
		var moved = false;
		var startX = 0;
		var startLeft = 0;

		pager.addEventListener('pointerdown', function (e) {
			if (e.pointerType !== 'mouse' || e.button !== 0) return;
			dragging = true;
			moved = false;
			startX = e.clientX;
			startLeft = pager.scrollLeft;
			pager.setPointerCapture(e.pointerId);
		});
		pager.addEventListener('pointermove', function (e) {
			if (!dragging) return;
			var dx = e.clientX - startX;
			if (!moved && Math.abs(dx) > 6) {
				moved = true;
				pager.classList.add('is-dragging');
			}
			if (moved) pager.scrollLeft = startLeft - dx;
		});
		function endDrag(e) {
			if (!dragging) return;
			dragging = false;
			if (moved) {
				var dx = e.clientX - startX;
				var from = Math.round(startLeft / pager.clientWidth);
				var target = from;
				// A committed pull of a quarter page, or a quick flick, turns the page.
				if (dx < -pager.clientWidth * 0.2) target = from + 1;
				else if (dx > pager.clientWidth * 0.2) target = from - 1;
				pager.classList.remove('is-dragging');
				goTo(target);
				// Swallow the click a drag would otherwise release onto a widget.
				pager.addEventListener(
					'click',
					function stop(ev) {
						ev.preventDefault();
						ev.stopPropagation();
						pager.removeEventListener('click', stop, true);
					},
					true,
				);
				setTimeout(function () {
					moved = false;
				}, 0);
			}
		}
		pager.addEventListener('pointerup', endDrag);
		pager.addEventListener('pointercancel', endDrag);

		updateDots();
	}

	// -- Light: a highlight that sits where the pointer is -------------------
	var lit = Array.prototype.slice.call(document.querySelectorAll('[data-tilt], [data-app] .app__tile'));

	function light(el, x, y) {
		var r = el.getBoundingClientRect();
		var nx = (x - (r.left + r.width / 2)) / (r.width * 1.2);
		var ny = (y - (r.top + r.height / 2)) / (r.height * 1.2);
		el.style.setProperty('--hx', clamp(50 + nx * 40, 8, 92) + '%');
		el.style.setProperty('--hy', clamp(50 + ny * 40, 8, 92) + '%');
	}

	function resetLight(el) {
		el.style.removeProperty('--hx');
		el.style.removeProperty('--hy');
	}

	if (!coarse.matches) {
		lit.forEach(function (el) {
			var host = el.closest('[data-tilt], [data-app]') || el;
			host.addEventListener('mousemove', function (e) {
				light(el, e.clientX, e.clientY);
			});
			host.addEventListener('mouseleave', function () {
				resetLight(el);
			});
		});
	}

	// -- Dock magnification ---------------------------------------------------
	var tray = document.querySelector('[data-dock]');
	if (tray && !coarse.matches && !reduce.matches) {
		var apps = Array.prototype.slice.call(tray.querySelectorAll('[data-app]'));
		var REACH = 150;
		var MAX = 1.32;

		tray.addEventListener('mousemove', function (e) {
			apps.forEach(function (app) {
				var r = app.getBoundingClientRect();
				var d = Math.abs(e.clientX - (r.left + r.width / 2));
				var t = clamp(1 - d / REACH, 0, 1);
				var s = 1 + (MAX - 1) * (t * t * (3 - 2 * t));
				app.style.setProperty('--scale', s.toFixed(3));
			});
		});
		tray.addEventListener('mouseleave', function () {
			apps.forEach(function (app) {
				app.style.removeProperty('--scale');
			});
		});
	}

	// -- Tilt: on a phone the light follows the device ------------------------
	if (coarse.matches && !reduce.matches && 'DeviceOrientationEvent' in window) {
		var enabled = false;
		function onOrientation(e) {
			var gamma = typeof e.gamma === 'number' ? e.gamma : 0;
			var beta = typeof e.beta === 'number' ? e.beta : 0;
			var x = clamp(gamma / 35, -1, 1);
			var y = clamp(beta / 45, -1, 1);
			lit.forEach(function (el) {
				el.style.setProperty('--hx', clamp(50 + x * 25, 8, 92) + '%');
				el.style.setProperty('--hy', clamp(50 + y * 25, 8, 92) + '%');
			});
		}
		function enable() {
			if (enabled) return;
			var D = window.DeviceOrientationEvent;
			if (typeof D.requestPermission === 'function') {
				D.requestPermission()
					.then(function (state) {
						if (state === 'granted') {
							enabled = true;
							window.addEventListener('deviceorientation', onOrientation, true);
						}
					})
					.catch(function () {});
			} else {
				enabled = true;
				window.addEventListener('deviceorientation', onOrientation, true);
			}
		}
		document.addEventListener('touchstart', enable, { once: true, passive: true });
	}
})();
