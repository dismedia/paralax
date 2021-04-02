import "./style.scss";
import {createElementObserver, createWindowObserver} from "./sources/sources";
import {add, fadeFactor, steps3} from "./pipes/pipes";
import {cssClassName, rotate, translate} from "./drivers/dom";
import {map, mapTo, scan, share, switchMap, take, tap, withLatestFrom} from "rxjs/operators";
import {from, interval, of, pipe} from "rxjs";


/*
const moveable1 = document.querySelector("#moveable1");
const moveable2 = document.querySelector("#moveable2");
const withClass1 = document.querySelector("#withClass1");
const withClass2 = document.querySelector("#withClass2");


const listEl0 = document.querySelector("#listEl0");
const listEl1 = document.querySelector("#listEl1");
const listEl2 = document.querySelector("#listEl2");
const listEl3 = document.querySelector("#listEl3");
const listEl4 = document.querySelector("#listEl4");


// createObserver({
//     thresholdStep: 0.025,
//     rootElement: null,
//     targetElement: document.querySelector("#area2")
// })
//     .pipe(
//         fadeFactor,
//         map(e=>e*360 as number),
//         rotate(moveable)
//     )
//


const fromLeftToRight = createElementObserver({
    thresholdStep: 0.025,
    rootElement: null,
    targetElement: document.querySelector("#area2")
})
    .pipe(
        fadeFactor,
        withLatestFrom(createWindowObserver),
        map(([e, window]) => ({
            x: e * window.innerWidth / 2 + window.innerWidth / 2,
            y: 0
        })),
    )


fromLeftToRight.pipe(translate(moveable1)).subscribe()
fromLeftToRight.pipe(translate(moveable2)).subscribe()


const simpleTrigger1 = createElementObserver({
    thresholdStep: 0.025,
    rootElement: null,
    targetElement: document.querySelector("#area3")
})
    .pipe(
        fadeFactor,
        steps3(0.1, ["before", "visible", "after"])
    )

const simpleTrigger2 = createElementObserver({
    thresholdStep: 0.025,
    rootElement: null,
    targetElement: document.querySelector("#area3")
})
    .pipe(
        fadeFactor,
        steps3(0.4, ["before", "visible", "after"])
    )

simpleTrigger1.pipe(cssClassName(withClass1)).subscribe()
simpleTrigger2.pipe(cssClassName(withClass2)).subscribe()


const sharedFadeFactor = createElementObserver({
    thresholdStep: 0.025,
    rootElement: null,
    targetElement: document.querySelector("#area4")
})
    .pipe(
        fadeFactor,
        share()
    )

sharedFadeFactor.pipe(add(0.2), steps3(0.1, ["before listItem", "visible listItem", "after listItem"]), cssClassName(listEl0)).subscribe()
sharedFadeFactor.pipe(add(0.1), steps3(0.1, ["before listItem", "visible listItem", "after listItem"]), cssClassName(listEl1)).subscribe()
sharedFadeFactor.pipe(add(0.0), steps3(0.1, ["before listItem", "visible listItem", "after listItem"]), cssClassName(listEl2)).subscribe()
sharedFadeFactor.pipe(add(-0.1), steps3(0.1, ["before listItem", "visible listItem", "after listItem"]), cssClassName(listEl3)).subscribe()
sharedFadeFactor.pipe(add(-0.2), steps3(0.1, ["before listItem", "visible listItem", "after listItem"]), cssClassName(listEl4)).subscribe()
*/


const data = ["backend solutions", "blockchain", "frontend applications", "a3d experience","tt","fy", "a3dev"]

of(data.map((phrase, i, array) => {
        const id = phrase.replace(" ", "_");
        return {
            phrase, id,
            element: document.querySelector("#" + id),
            phase: i / array.length
        }

    }
    )
).pipe(
    switchMap(
        (arr: { element: Element, phase: number }[]) => createElementObserver({
            thresholdStep: 0.1/arr.length,
            rootElement: null,
            targetElement: document.querySelector("#area1")
        }).pipe(
            fadeFactor,
            switchMap((value: number) =>
                interval(100).pipe(
                    take(15),
                    mapTo(value)
                ),
            ),
            scan((acc, v) => {

                    const m = 0.3
                    //EMA = Closing price x multiplier + EMA (previous day) x (1-multiplier)
                    return (v * m) + acc * (1 - m)
                }, 0
            ),
            tap(value => {

                arr.forEach(({element, phase}) => {



                    const el = element as any
                    const x = (value - phase) / ( 1/arr.length);

                    //el.innerHTML=value-phase;

                    if (x > 0 && x < 1) {
                        //if(x<0.5) el.style.opacity = Math.min(x*4,0);
                        //if(x>=0.5) el.style.opacity = Math.max(-x*4+4,0);
                        el.className = "visible";

                    } else {
                        el.className="invisible";
                    }


                })

            })
        ),
    ),
)


    .subscribe(s => console.log(s))


