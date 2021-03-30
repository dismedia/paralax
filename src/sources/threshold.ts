export const thresholdGenerator=function*(step:number=0.1){
    let s=0;
    while(s<1){
        yield s;
        s+=step;
    }
    yield s=Math.min(1,s);
    return;
}



