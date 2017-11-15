import identity = require('lodash/identity');
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

export { Subscription };

export type StreamSuccessHandler<R> = (result: R) => void;
export type StreamErrorHandler = (error: any) => void;

/**
 * Creates infinite stream
 * Ussage:
 * const { subject, subscription } = createStream(
 *      (result) => console.log('Success:', result),
 *      (error) => console.error('Error:', error)
 * );
 * subject.next(promise1);
 * subject.next(promise2);
 *
 * subscription.unsubscribe();
 * subject.unsubscribe();
 *
 * @param successHandler
 * @param errorHandler
 */
export function createStream<T, R>(successHandler: StreamSuccessHandler<R>, errorHandler: StreamErrorHandler) {
    const subject: Subject<T> = new Subject<T>();
    const subscription = subject
        // This ensures we get last added promise
        .switchMap<T, R>(identity)

        // Streams are closed on error by default so we need this workaround
        .catch((error, caught) => {
            errorHandler(error); // handle error
            return caught; // stream continue
        })
        .subscribe(successHandler);

    return {
        subject, // usage this for subject.next(promise);
        subscription // needed for cleanup
    };
}
