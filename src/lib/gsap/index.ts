import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import SplitType from "split-type"
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger, SplitText, CustomEase);

export { CustomEase, gsap, ScrollToPlugin, ScrollTrigger, SplitText, useGSAP };
