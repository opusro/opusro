// The brand mark's open and close. Served as a file from opus.ro so the
// Content-Security-Policy's `script-src 'self'` allows it; an inlined script
// would be blocked. Without this file the definition is simply visible.
(function () {
	var root = document.querySelector('[data-brand]');
	var toggle = root && root.querySelector('[data-brand-toggle]');
	if (!root || !toggle) return;

	root.classList.add('has-js');

	function set(open) {
		root.classList.toggle('is-open', open);
		toggle.setAttribute('aria-expanded', String(open));
	}

	var coarse = window.matchMedia('(hover: none), (pointer: coarse)');

	toggle.addEventListener('click', function () {
		set(!root.classList.contains('is-open'));
	});
	root.addEventListener('mouseenter', function () {
		if (!coarse.matches) set(true);
	});
	root.addEventListener('mouseleave', function () {
		if (!coarse.matches) set(false);
	});
	toggle.addEventListener('focus', function () {
		set(true);
	});
	toggle.addEventListener('blur', function () {
		if (!root.matches(':hover')) set(false);
	});
})();
