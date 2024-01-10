import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { GSDevTools } from "gsap/GSDevTools";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { MotionPathHelper } from "gsap/MotionPathHelper";
// import { CustomEase } from "gsap/CustomEase";
import ScrollBooster from "scrollbooster";

import lottie from "lottie-web";

import data from "@/assets/json/data.json";

import { $, $$, scaleClip, spOnly, oneLineSplit, randomId } from "@:js/plugins/_global.js";
gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  // ScrollToPlugin,
  GSDevTools,
  SplitText,
  MorphSVGPlugin,
  MotionPathPlugin
  // MotionPathHelper,
  // CustomEase
);

export default class App {
  constructor() {}
  init() {
    if ($("[top-page]") === null) return;

    // lottie
    // console.log(data);
    const animation = lottie.loadAnimation({
      container: $(".test-wrap"),
      renderer: "svg",
      autoplay: true,
      loop: true,
      animationData: data,
    })

    animation.addEventListener("DOMLoaded",()=>{
      setTimeout(() => {
        
        console.log($('[aria-label="これはダミーテキストです。"]'));
        const target = $('svg .text')

        gsap.set('.test-wrap__button',{
          width: target.rect('width'),
          height: target.rect('height'),
          y: target.rect('y'),
          x: target.rect('x'),
        })

        $('.test-wrap__button').addEventListener("mouseenter",()=>{
          console.log($('[aria-label="これはダミーテキストです。"]'));

          gsap.to('.line-1, .line-3',{
            opacity: 0.1,
          })
        })
        $('.test-wrap__button').addEventListener("mouseleave",()=>{
          // console.log("mouseleave");
          gsap.to('.line-1, .line-3',{
            opacity: 1,
          })
        })
        

        console.log($(".line-1 path"));

        $(".line-1 path").addEventListener("mouseenter",()=>{
          console.log('line 1');
        })
        $(".line-2 path").addEventListener("mouseenter",()=>{
          console.log('line 2');
        })
        $(".line-3 path").addEventListener("mouseenter",()=>{
          console.log('line 3');
        })

        $(".line-1 path").addEventListener("mouseleave",()=>{
          gsap.to('.line-2, .line-3',{
            opacity: 1,
          })
        })
      }, 400);
      
    })
  }
}
