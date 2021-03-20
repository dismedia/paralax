import {PositionValueSource} from "./domain";
import {of} from "rxjs";

export const simpleSource:PositionValueSource=of({fromPx:0,toPx:100});


