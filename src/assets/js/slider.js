// initial flickity slider on elm
const initFlkty = function (elm) {
	// the passed arg (elm) is main.slider tag
	var flkty = new Flickity(elm, {
		// options
		contain: true,
		pageDots: false,
		prevNextButtons: false,
		draggable: false,
		watchCSS: true,
	});

	// trigger slider by mouse wheel
	elm.addEventListener("wheel", (e) => {
		if (sliderEnable) {
			console.log("slider working...");
			e.preventDefault();
			if (e.deltaY > 0) {
				// prev slide
				flkty.previous();
			} else {
				// next slide
				flkty.next();
			}
		} else {
			console.log("slider not working...");
		}
	});
};
// main slider wrapper  that will be observed for mutations
var sliderWrp = document.querySelector("main.slider");
// boolean for toggle slider
var sliderEnable = false;

// Options for the observer (which mutations to observe)
const config = { attributes: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
	for (const mutation of mutationList) {
		console.log(mutation);
		if (mutation.type === "attributes") {
			console.log(`The ${mutation.attributeName} attribute was modified.`);
			sliderEnable = true;
			initFlkty(mutation.target);
			canActive = false;
			// Later, you can stop observing
			observer.disconnect();
		}
	}
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(sliderWrp, config);

// bool for toggle slider activator
var canActive = true;

// slider activator element
const activatorElm = document.querySelector(".sliderActivator");

// slider activator fn
const activator = (e) => {
	if (canActive) {
		console.log("slider activator working...");
		if (e.deltaY > 0) {
			// remove enable class from sliderWrp
			sliderWrp.classList.remove("enable");
		} else {
			// add enable class to sliderWrp
			sliderWrp.classList.add("enable");
			activatorElm.classList.remove("enable");
		}
	} else {
		console.log("slider activator not work");
	}
};

// if element exist
if (activatorElm != null) {
	activatorElm.addEventListener("wheel", (e) => {
		activator(e);
	});
}
