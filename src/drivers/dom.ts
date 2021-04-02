import {Observable, pipe} from "rxjs";
import {Position} from "../sources/domain";
import {tap} from "rxjs/operators";


export const rotate = (element: any) => pipe(
    tap(p =>
        element.style.transform = `rotate(${p}deg)`//`translate(${p.x},${p.y})`
    )
)

export const translate = (element: any) => pipe(
    tap((p: Position) => {

            element.style.transform = `translate(${p.x}px, ${p.y}px)`
        }
    )
)

export const opacity = (element: any) => pipe(
    tap((value:number) => {
            element.style.opacity = value
        }
    )
)


export const cssClassName = (element: any) => pipe(
    tap((p: string) => {
            element.className = p
        }
    )
)
