import SmoothScroll from 'smooth-scroll';


var scroll = new SmoothScroll();

const scrollSettings = {
  speed: 1000, // Integer. How fast to complete the scroll in milliseconds
	easing: 'easeInOutQuad', // Easing pattern to use
}

var smoothScrollWithoutHash = function (selector, settings) {

	var clickHandler = function (event) {
		var toggle = event.target.closest( selector );
		
		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;

		var anchor = document.querySelector( toggle.hash );
		if ( !anchor ) return;

		event.preventDefault(); // Prevent default click event
		scroll.animateScroll( anchor, toggle, settings || {} ); // Animate scroll
	};

	window.addEventListener('click', clickHandler, false );
};

smoothScrollWithoutHash( 'a[href*="#"]', scrollSettings );