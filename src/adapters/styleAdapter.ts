import {Observable, pipe} from "rxjs";
import {ScrollValue} from "../sources/domain";
import {map, tap, throttleTime} from "rxjs/operators";

export type AbsolutePosition = number


export const affectPosition = (domElement: any) => pipe(
    //throttleTime(30),
    map((s: ScrollValue) => {
            return s.fromPx+(s.p*(s.height-100));
    }),
    tap(v => {
        domElement.innerHTML=v.toString()
        domElement.style.transform = 'translate(0,'+v.toString()+'px)';
    })
)


