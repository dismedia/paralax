import "./style.scss";
import {createObserver} from "./sources/sources";


createObserver({
    thresholdStep: 0.025,
    rootElement: null,
    targetElement: document.querySelector("#area2")
}).subscribe((e) => {

    console.log(e[0].intersectionRatio);
    //console.log(e[0]);
    //document.querySelector("#dbg1").innerHTML=""+e[0].intersectionRatio

})
