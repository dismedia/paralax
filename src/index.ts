import { affectPosition } from "./adapters/styleAdapter";
import {domSource} from "./sources/sources";

console.log("entry");


setTimeout(()=>{

    domSource(window as any)
        .subscribe((e)=>{
            console.log(e)
        })


    const el=(window as any).document.body.querySelector("#el1")


    domSource(window as any)
        .pipe(
            affectPosition(el)
        )
        .subscribe((e)=>{})




},100)

