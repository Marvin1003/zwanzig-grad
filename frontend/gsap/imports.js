import TimelineLite from "gsap/umd/TimelineLite";
import CSSPlugin from "gsap/umd/CSSPlugin";
import TextPlugin from "gsap/umd/TextPlugin";
import ScrollToPlugin from "gsap/umd/ScrollToPlugin";
import BezierPlugin from "gsap/umd/BezierPlugin";
import CustomEase from "./CustomEase";
// Temp workaround to prevent tree shaking kicking in
console.log(TimelineLite, CSSPlugin, TextPlugin, ScrollToPlugin, BezierPlugin);
console.clear();

CustomEase.create("zwanzig-grad", "M0,0 C0.902,0 0.094,1 1,1");
