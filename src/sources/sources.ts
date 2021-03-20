import {ScrollValue, ScrollValueSource} from "./domain";
import {combineLatest, from, fromEvent, merge, of} from "rxjs";
import {map, startWith} from "rxjs/operators";



const extractPositionValues = (window) => {

    const docElement = document.documentElement;
    const body = window.document.body

    if (!body) return null;

    //not correct yet

    return {
        fromPx: window.pageYOffset,
        toPx: window.pageYOffset + window.innerHeight,
        p: window.pageYOffset / (window.document.documentElement.scrollHeight - window.innerHeight),

        height:window.innerHeight,
        width:window.innerWidth,

        docHeight:window.document.documentElement.scrollHeight,
        docWidth:window.document.documentElement.scrollWidth


    } as ScrollValue


}

export const domSource = (window) => merge(
    fromEvent(window, "resize"),
    fromEvent(window, "scroll")
).pipe(
    map((resizeEvent, ScrollEvent) => extractPositionValues(window)),
    startWith(extractPositionValues(window))
)
