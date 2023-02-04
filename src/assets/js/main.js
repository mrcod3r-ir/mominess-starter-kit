// NO JS Fallbacks for css
document.body.classList.add("js");

// Environmental
if (process.env.NODE_ENV === "development") {
	require("./devonly/dev");
}

// require("./slider");
// require("./gsap");
// Mobile menu
var openMenuButton = document.getElementById("openMobileMenu"),
	closeMenuButton = document.getElementById("closeMobileMenu"),
	mobileMenu = document.getElementById("mobileMenu");
// openMenuButton.addEventListener("click", () =>
// 	mobileMenu.classList.remove("hidden")
// );
// closeMenuButton.addEventListener("click", () =>
// 	mobileMenu.classList.add("hidden")
// );

let sections = gsap.utils.toArray(".section");
let rowHeight = 0;

document.querySelectorAll(".section").forEach((el, i) => {
	let hH = el.getBoundingClientRect().width;
	// console.log(hH)
	rowHeight = rowHeight + hH;
});

// set window width for pin-spacer
window.onload = function () {
	// alert('Page is loaded');
	document.querySelector(".pin-spacer").classList.add("!mx-0");
};

gsap.to(sections, {
	xPercent: -100 * (sections.length - 1),
	ease: "none",
	scrollTrigger: {
		trigger: ".hScroll",
		pin: true,
		scrub: 1,
		// snap: 1 / (sections.length - 1),
		end: "+=" + (rowHeight - window.innerWidth),
	},
});
