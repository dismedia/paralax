import {combineLatest, from, fromEvent, merge, Observable, of, Subject} from "rxjs";
import {thresholdGenerator} from "./threshold";
import {IntersectionObserverOptions} from "./domain";
import {map, startWith} from "rxjs/operators";


export const createElementObserver: (options: IntersectionObserverOptions) => Observable<IntersectionObserverEntry> = (options: IntersectionObserverOptions) => {

    const threshold = Array.from(thresholdGenerator(options.thresholdStep))

    let internalObserverOptions = {
        root: options.rootElement,
        rootMargin: '0px',
        threshold
    }


    return new Observable((subscriber) => {
        let observer: IntersectionObserver = new IntersectionObserver((v) => {
            subscriber.next(v[0])
        }, internalObserverOptions);

        observer.observe(options.targetElement)

        return () => {
            observer.unobserve(options.targetElement)
        }
    })
}


export const createWindowObserver: Observable<Window> = fromEvent(window, "resize")
    .pipe(
        map(e => e.currentTarget as Window),
        startWith(window)
    )
