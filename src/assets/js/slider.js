const first_section = document.querySelector("main section:first-child");
const repositionSlider = () => {
	const myInterval = setInterval(() => {
		flickity_2.reposition();
		console.log("myInterval....");
	}, 10);
	setTimeout(() => {
		clearInterval(myInterval);
	}, 210);
};

// use x and y mousewheel event data to navigate flickity
function flickity_handle_wheel_event(
	e,
	flickity_instance,
	flickity_is_animating
) {
	// do not trigger a slide change if another is being animated
	if (!flickity_is_animating) {
		// pick the larger of the two delta magnitudes (x or y) to determine nav direction
		var direction =
			Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

		// console.log("wheel scroll ", e.deltaX, e.deltaY, direction);

		if (direction > 0) {
			// next slide
			if (
				flkty_selected_target == 0 &&
				first_section.classList.contains("shrink") == false
			) {
				// if is first trigger of mouse and section has not shrink class prevent next slide and add shrink class
				// document.querySelector("main.slider").classList.add("animate");
				first_section.classList.add("shrink");

				// repositionSlider();
				flickity_2.reposition();
			} else if (
				flkty_selected_target == 0 &&
				first_section.classList.contains("shrink") == true
			) {
				flickity_instance.next();
			} else {
				flickity_instance.next();
			}
		} else {
			// prev slide

			if (flkty_selected_target == 0) {
				// first section must be full width
				first_section.classList.remove("shrink");
				// document.querySelector("main.slider").classList.remove("animate");
				flickity_2.reposition();
				// repositionSlider();
			}
			flickity_instance.previous();
		}
	}
}

// second carousel
var carousel_2 = document.querySelector("main.slider");
var flickity_2 = new Flickity("main.slider", {
	contain: true,
	pageDots: false,
	prevNextButtons: true,
	draggable: false,
	wrapAround: false,
	selectedAttraction: 0.01,
	friction: 0.15,
	// watchCSS: true,
	on: {
		ready: function () {
			// console.log("Flickity is ready");
		},
		change: function (index) {
			// console.log("Slide changed to" + index);
			flkty_selected_target = index;
		},
	},
});
var flickity_2_is_animating = 0;
var flkty_selected_target = 0;
flickity_2.on("settle", function (index) {
	// console.log("Slide settle " + index);
	flickity_2_is_animating = false;
	// console.log("flkty_selected_target =", flkty_selected_target);
});

flickity_2.on("select", function (index) {
	// console.log("Slide selected " + index);
	flickity_2_is_animating = true;
});

// detect mousewheel event within carousel element
carousel_2.onwheel = function (e) {
	flickity_handle_wheel_event(e, flickity_2, flickity_2_is_animating);
};
