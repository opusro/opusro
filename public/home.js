// The homescreen's feel: the dock magnifies under the pointer, widgets and
// icons catch the light where the pointer is, and on a phone the light follows
// the tilt of the device once the person has touched the screen. Served as a
// file so the Content-Security-Policy's `script-src 'self'` allows it; without
// it the screen is still a screen, just still.
(function () {
	var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
	var coarse = window.matchMedia('(hover: none), (pointer: coarse)');

	// -- Light: a highlight that sits where the pointer is -------------------
	var lit = Array.prototype.slice.call(document.querySelectorAll('[data-tilt], [data-app] .app__tile'));

	function clamp(v, lo, hi) {
		return Math.min(hi, Math.max(lo, v));
	}

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
				// Ease so the neighbours swell gently and the one under the
				// pointer swells most.
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
