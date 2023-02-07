const first_section = document.querySelector("main section:first-child");
const intro_section = document.querySelector("section#intro");

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

		if (direction > 0) {
			// next slide
			if (
				flkty_selected_target == 0 &&
				intro_section.classList.contains("shrink") == false
			) {
				console.log("next1");
				// if is first trigger of mouse and section has not shrink class prevent next slide and add shrink class
				intro_section.classList.add("shrink");
			} else if (
				flkty_selected_target == 0 &&
				intro_section.classList.contains("shrink") == true
			) {
				console.log("next2");
				intro_section.classList.add("!hidden");
				flickity_instance.next();
			} else {
				console.log("next3");
				flickity_instance.next();
			}
		} else {
			// prev slide
			console.log("flkty_selected_target ", flkty_selected_target);
			if (
				flkty_selected_target == 0 &&
				intro_section.classList.contains("!hidden")
			) {
				console.log("1...");
				intro_section.classList.remove("!hidden");
			} else if (intro_section.classList.contains("shrink")) {
				intro_section.classList.remove("shrink");
				console.log("2...");
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
	// console.log(flkty_selected_target, index);
	flickity_2_is_animating = true;
});

// detect mousewheel event within carousel element
carousel_2.onwheel = function (e) {
	flickity_handle_wheel_event(e, flickity_2, flickity_2_is_animating);
};
intro_section.onwheel = function (e) {
	flickity_handle_wheel_event(e, flickity_2, flickity_2_is_animating);
};
