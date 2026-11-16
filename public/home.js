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

	/* ---- Particles: Loop's mandala drawn as drifting points ----------------
	 *
	 * Loop's own site draws its mandala in particles, so its story does too, in
	 * its green, from its glyph (/loop.svg). Particles are Loop's alone; the
	 * other stories show their mark plainly. The points gather out of a loose
	 * cloud when the story opens, then breathe and turn very slowly; a pointer
	 * pushes them aside. Reduced motion draws them still. Nothing runs while
	 * the story is closed.
	 */
	var sourceCache = {};
	// A mask to sample: a canvas with the glyph drawn on it.
	function markSource(canvas) {
		var url = canvas.getAttribute('data-particles');
		var key = url;
		if (sourceCache[key]) return sourceCache[key];
		var made = fetch(url)
			.then(function (r) {
				return r.text();
			})
			.then(function (svgText) {
				var doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
				var svg = doc.querySelector('svg');
				var box = (svg.getAttribute('viewBox') || '0 0 120 120').split(/[\s,]+/).map(Number);
				var S = 360;
				var c = document.createElement('canvas');
				c.width = c.height = S;
				var x = c.getContext('2d');
				x.scale(S / box[2], S / box[3]);
				x.translate(-box[0], -box[1]);
				Array.prototype.forEach.call(doc.querySelectorAll('path'), function (el) {
					var path = new Path2D(el.getAttribute('d'));
					var sw = el.getAttribute('stroke-width');
					if (sw && el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
						x.lineWidth = Number(sw);
						x.lineCap = 'round';
						x.lineJoin = 'round';
						x.stroke(path);
					}
					if (el.getAttribute('fill') !== 'none') x.fill(path);
				});
				return { canvas: c };
			});
		sourceCache[key] = made;
		return made;
	}

	// Points on the mark, mostly on its outline, in units of its longer side,
	// centred on 0.
	function samplePoints(src, count) {
		var W = src.canvas.width;
		var H = src.canvas.height;
		var M = Math.max(W, H);
		var data = src.canvas.getContext('2d').getImageData(0, 0, W, H).data;
		function on(px, py) {
			if (px < 0 || py < 0 || px >= W || py >= H) return false;
			return data[(py * W + px) * 4 + 3] > 120;
		}
		var edge = [];
		var fill = [];
		for (var py = 0; py < H; py++) {
			for (var px = 0; px < W; px++) {
				if (!on(px, py)) continue;
				if (!on(px - 1, py) || !on(px + 1, py) || !on(px, py - 1) || !on(px, py + 1)) edge.push([px, py]);
				else fill.push([px, py]);
			}
		}
		if (!count) count = Math.max(1400, Math.min(5200, Math.round(edge.length * 0.9)));
		var out = [];
		var edges = Math.round(count * 0.86);
		for (var i = 0; i < count; i++) {
			var list = i < edges ? edge : fill;
			if (!list.length) list = edge.length ? edge : fill;
			var p = list[(Math.random() * list.length) | 0];
			out.push([(p[0] + Math.random() - 0.5 - W / 2) / M, (p[1] + Math.random() - 0.5 - H / 2) / M]);
		}
		return out;
	}

	function Particles(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.color = canvas.getAttribute('data-color') || '#ffffff';
		this.running = false;
		this.frame = 0;
		this.pointer = null;
		this.ready = markSource(canvas);
		var self = this;
		var hero = canvas.closest('[data-drag]') || canvas.parentNode;
		hero.addEventListener('pointermove', function (e) {
			if (e.pointerType !== 'mouse') return;
			var r = canvas.getBoundingClientRect();
			self.pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
		});
		hero.addEventListener('pointerleave', function () {
			self.pointer = null;
		});
	}
	Particles.prototype.size = function () {
		var r = this.canvas.getBoundingClientRect();
		var dpr = Math.min(window.devicePixelRatio || 1, 2);
		this.w = r.width;
		this.h = r.height;
		this.canvas.width = Math.round(r.width * dpr);
		this.canvas.height = Math.round(r.height * dpr);
		this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	};
	Particles.prototype.centre = function () {
		return { x: this.w / 2, y: this.h * 0.42 };
	};
	Particles.prototype.scale = function () {
		return Math.min(this.w * 0.86, this.h * 0.8);
	};
	Particles.prototype.start = function () {
		var self = this;
		this.ready.then(function (src) {
			self.size();
			var small = self.w < 500;
			if (!self.targets) self.targets = samplePoints(src);
			var pts = small ? self.targets.slice(0, Math.round(self.targets.length * 0.7)) : self.targets;
			var c = self.centre();
			self.pts = pts.map(function (t) {
				var a = Math.random() * Math.PI * 2;
				var rad = (0.2 + Math.random() * 0.8) * Math.max(self.w, self.h) * 0.6;
				return {
					x: c.x + Math.cos(a) * rad,
					y: c.y + Math.sin(a) * rad,
					vx: 0,
					vy: 0,
					t: t,
					ph: Math.random() * Math.PI * 2,
					a: 0.28 + Math.random() * 0.6,
					s: Math.random() < 0.1 ? 1.5 : 1,
				};
			});
			self.dust = [];
			for (var i = 0; i < (small ? 60 : 100); i++) {
				self.dust.push({ x: Math.random() * self.w, y: Math.random() * self.h, ph: Math.random() * 6.28, a: 0.06 + Math.random() * 0.16 });
			}
			self.t0 = performance.now();
			self.running = true;
			if (reduceMotion.matches) {
				var sc = self.scale();
				self.pts.forEach(function (p) {
					p.x = c.x + p.t[0] * sc;
					p.y = c.y + p.t[1] * sc;
				});
				self.draw(0);
				return;
			}
			cancelAnimationFrame(self.frame);
			self.loop();
		});
	};
	Particles.prototype.stop = function () {
		this.running = false;
		cancelAnimationFrame(this.frame);
	};
	Particles.prototype.loop = function () {
		var self = this;
		this.frame = requestAnimationFrame(function (now) {
			if (!self.running) return;
			self.step(now - self.t0);
			self.draw(now - self.t0);
			self.loop();
		});
	};
	// Where a point of the mark is on screen at time t.
	Particles.prototype.place = function (tx, ty, t) {
		var c = this.centre();
		var sc = this.scale() * (1 + 0.012 * Math.sin(t / 2600));
		// One turn in about nine minutes.
		var rot = t / 90000;
		var x = tx * sc;
		var y = ty * sc;
		return { x: c.x + x * Math.cos(rot) - y * Math.sin(rot), y: c.y + x * Math.sin(rot) + y * Math.cos(rot) };
	};
	Particles.prototype.step = function (t) {
		var k = t < 1600 ? 0.012 + 0.03 * (t / 1600) : 0.042;
		var ptr = this.pointer;
		for (var i = 0; i < this.pts.length; i++) {
			var p = this.pts[i];
			var g = this.place(p.t[0], p.t[1], t);
			var gx = g.x + Math.sin(t / 900 + p.ph) * 0.9;
			var gy = g.y + Math.cos(t / 1100 + p.ph) * 0.9;
			p.vx += (gx - p.x) * k;
			p.vy += (gy - p.y) * k;
			if (ptr) {
				var dx = p.x - ptr.x;
				var dy = p.y - ptr.y;
				var d2 = dx * dx + dy * dy;
				if (d2 < 3600) {
					var f = (1 - d2 / 3600) * 2.2;
					var d = Math.sqrt(d2) || 1;
					p.vx += (dx / d) * f;
					p.vy += (dy / d) * f;
				}
			}
			p.vx *= 0.82;
			p.vy *= 0.82;
			p.x += p.vx;
			p.y += p.vy;
		}
	};
	Particles.prototype.draw = function (t) {
		var c = this.ctx;
		c.clearRect(0, 0, this.w, this.h);
		c.globalCompositeOperation = 'lighter';
		c.fillStyle = this.color;
		for (var i = 0; i < this.dust.length; i++) {
			var d = this.dust[i];
			c.globalAlpha = d.a * (0.6 + 0.4 * Math.sin(t / 1400 + d.ph));
			var y = (((d.y - t / 90) % this.h) + this.h) % this.h;
			c.fillRect(d.x + Math.sin(t / 5000 + d.ph) * 6, y, 1, 1);
		}
		for (var j = 0; j < this.pts.length; j++) {
			var p = this.pts[j];
			c.globalAlpha = p.a * (0.75 + 0.25 * Math.sin(t / 700 + p.ph));
			c.fillRect(p.x, p.y, p.s, p.s);
		}
		c.globalAlpha = 1;
		c.globalCompositeOperation = 'source-over';
	};

	var particles = {};
	Array.prototype.forEach.call(home.querySelectorAll('canvas.story__canvas'), function (canvas) {
		var id = canvas.closest('dialog').getAttribute('data-sheet');
		if (typeof Path2D === 'function') particles[id] = new Particles(canvas);
	});
	document.addEventListener('visibilitychange', function () {
		if (!current || !particles[current.id]) return;
		if (document.hidden) particles[current.id].stop();
		else particles[current.id].start();
	});

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
			scroll: sheet.querySelector('[data-scroll]') || sheet.querySelector('[data-panel]'),
			art: sheet.querySelector('[data-art]'),
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
		p.scroll.scrollTop = 0;
		if (particles[id]) particles[id].start();

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

			if (p.art) {
				// The picture settles into place, as an opened story's does.
				anims.push(
					p.art.animate([{ transform: 'scale(1.08)', opacity: 0.4 }, { transform: 'none', opacity: 1 }], {
						duration: 900,
						easing: EASE_OUT,
					}),
				);
			}
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
						{ duration: 460, delay: 200 + Math.min(i, 8) * 50, easing: EASE_OUT, fill: 'backwards' },
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
			// Scrolled so far that the icon has left the panel: there is
			// nothing to fly home, so the panel simply goes.
			var box = p.panel.getBoundingClientRect();
			var iconShown = to.top >= box.top - 1 && to.bottom <= box.bottom + 1;
			if (!iconShown) from = null;

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
				if (iconShown) {
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
				} else {
					anims.push(
						p.panel.animate(
							[
								{ transform: 'none', opacity: 1 },
								{ transform: 'scale(0.96)', opacity: 0 },
							],
							{ duration: 260, easing: EASE_IN, fill: 'forwards' },
						),
					);
				}
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
			if (particles[current.id]) particles[current.id].stop();
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

		// Once the picture has scrolled away, the app row holds the top, as
		// in an App Store story, and makes room for the close button.
		var hero = sheet.querySelector('[data-drag]');
		if (hero && p.scroll !== p.panel) {
			p.scroll.addEventListener(
				'scroll',
				function () {
					p.panel.classList.toggle('is-stuck', p.scroll.scrollTop >= hero.offsetHeight - 1);
				},
				{ passive: true },
			);
		}

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
			// A story scrolls; it is pulled down by its picture. A short sheet
			// can be pulled from anywhere.
			if (p.scroll !== p.panel && !e.target.closest('[data-drag]')) return;
			if (p.scroll.scrollTop > 0) return;
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
