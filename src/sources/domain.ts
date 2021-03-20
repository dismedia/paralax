import {Observable} from "rxjs";

export  interface PositionValue {

    fromPx:number;
    toPx:number;

}


export type PositionValueSource=Observable<PositionValue>
