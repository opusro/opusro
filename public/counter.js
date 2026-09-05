// Plausible's init, as a file rather than an inline script so the
// Content-Security-Policy allows it. Cookieless, no personal data; see /privacy.
window.plausible =
	window.plausible ||
	function () {
		(plausible.q = plausible.q || []).push(arguments);
	};
plausible.init =
	plausible.init ||
	function (i) {
		plausible.o = i || {};
	};
plausible.init();
