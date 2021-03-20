import {PositionValue, PositionValueSource} from "./domain";
import {combineLatest, from, fromEvent, merge, of} from "rxjs";
import {map, startWith} from "rxjs/operators";

export const simpleSource: PositionValueSource = of({fromPx: 0, toPx: 100});


function getScrollPercent() {
    var docElement = document.documentElement,
        body = document.body
    return (docElement['scrollTop'] || body['scrollTop']) / ((docElement['scrollHeight'] || body['scrollHeight']) - docElement.clientHeight) * 100;
}


const extractPositionValues = (window) => {

    const docElement = document.documentElement;
    const body = window.document.body

    if(!body) return null;

    //not correnc yet

    return {


        fromPx: window.pageYOffset,
        toPx: window.pageYOffset + window.outerHeight,

        p:window.pageYOffset/(window.document.documentElement.scrollHeight-window.outerHeight)

    } as PositionValue


}

export const domSource = (window) => merge(
    fromEvent(window, "resize"),
    fromEvent(window, "scroll")
).pipe(
    map((resizeEvent, ScrollEvent) => extractPositionValues(window)),
    startWith(extractPositionValues(window))
)
