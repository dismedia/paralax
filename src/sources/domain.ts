import {Observable} from "rxjs";

export  interface ScrollValue {

    fromPx:number;
    toPx:number;
    p:number;

   width:number;
   height:number;

    docWidth:number;
    docHeight:number;

}


export type ScrollValueSource =Observable<ScrollValue>
