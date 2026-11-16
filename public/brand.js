// The brand mark's open and close. Served as a file from opus.ro so the
// Content-Security-Policy's `script-src 'self'` allows it; an inlined script
// would be blocked. Without this file the name and the definition are simply
// visible.
//
// Pointer: hover opens, leaving closes. Touch: a tap on the mark, or anywhere
// on the open screen, toggles, as the March homescreen did. Keyboard: focus
// opens, Escape closes.
(function () {
	var root = document.querySelector('[data-brand]');
	var toggle = root && root.querySelector('[data-brand-toggle]');
	if (!root || !toggle) return;

	root.classList.add('has-js');

	var hover = window.matchMedia('(hover: hover) and (pointer: fine)');
	var lastToggle = 0;

	function isOpen() {
		return root.classList.contains('is-open');
	}
	function set(open) {
		if (open === isOpen()) return;
		root.classList.toggle('is-open', open);
		toggle.setAttribute('aria-expanded', String(open));
	}
	function flip() {
		// One tap fires pointer and click; let only one of them count.
		var now = Date.now();
		if (now - lastToggle < 250) return;
		lastToggle = now;
		set(!isOpen());
	}

	toggle.addEventListener('click', function (event) {
		event.stopPropagation();
		if (hover.matches && event.detail > 0) {
			// With a mouse, hover already opened it; a click pins nothing.
			set(true);
			return;
		}
		flip();
	});

	root.addEventListener('pointerenter', function (event) {
		if (event.pointerType === 'mouse' && hover.matches) set(true);
	});
	root.addEventListener('pointerleave', function (event) {
		if (event.pointerType === 'mouse' && hover.matches && document.activeElement !== toggle) set(false);
	});

	toggle.addEventListener('focus', function () {
		if (toggle.matches(':focus-visible')) set(true);
	});
	toggle.addEventListener('blur', function () {
		if (!root.matches(':hover')) set(false);
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && isOpen() && !document.querySelector('dialog[open]')) set(false);
	});

	// Anywhere on the screen that is not something else to press toggles it.
	document.addEventListener('click', function (event) {
		var target = event.target;
		if (!(target instanceof Element)) return;
		if (target.closest('a, button, input, dialog, [data-dock], [data-no-brand]')) return;
		if (window.getSelection && String(window.getSelection()).length) return;
		flip();
	});
})();
