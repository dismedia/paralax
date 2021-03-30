import {Observable, pipe} from "rxjs";
import {FadeFactor} from "../sources/domain";
import {map} from "rxjs/operators";


export const fadeFactor = pipe<Observable<IntersectionObserverEntry>, Observable<FadeFactor>>(
    map((e) => ((e.boundingClientRect.y > 0 ? -1 + e.intersectionRatio : 1 - e.intersectionRatio)))
)


export const add=(v:FadeFactor) =>pipe<Observable<FadeFactor>, Observable<FadeFactor>>(
   map(e=>e+v)
)


export const steps3 = (edge: number, classes: [string, string, string]) => pipe<Observable<FadeFactor>, Observable<string>>(
    map((v) => {

        if (v < -edge) return classes[0]
        if (v > edge) return classes[2]

        return classes[1]

    })
)
