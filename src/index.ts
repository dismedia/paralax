import {domSource} from "./sources/sources";

console.log("entry");


domSource(window as any).subscribe((e)=>{
    console.log(e)
})
