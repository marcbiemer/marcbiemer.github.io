import { gsap } from "@/lib/gsap";

export function scrollToSection(id: string, fromNav = false) {
	if (!document.getElementById(id)) return;

	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	gsap.to(window, {
		duration: reduceMotion || fromNav ? 0 : 1,
		ease: "power2.inOut",
		scrollTo: { y: `#${id}`, offsetY: 0 },
		onComplete: () => {
			history.pushState(null, "", `#${id}`);
		},
	});
}