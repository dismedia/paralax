import {combineLatest, from, fromEvent, merge, Observable, of, Subject} from "rxjs";
import {thresholdGenerator} from "./threshold";
import {IntersectionObserverOptions} from "./domain";


export const createObserver: (options: IntersectionObserverOptions) => Observable<IntersectionObserverEntry[]> = (options: IntersectionObserverOptions) => {


    const thresholds=Array.from(thresholdGenerator(options.thresholdStep)).reverse();
    console.log(thresholds.reverse())

    let internalObserverOptions = {
        root: options.rootElement,
        rootMargin: '0px',
        threshold: thresholds
    }


    return new Observable((subscriber) => {
        let observer: IntersectionObserver = new IntersectionObserver((v) => {
            subscriber.next(v)
        }, internalObserverOptions);

        observer.observe(options.targetElement)

        return () => {
            observer.unobserve(options.targetElement)
        }

    })

}

