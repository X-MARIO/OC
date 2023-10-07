import { filter } from 'rxjs/operators';

import type { Observable } from 'rxjs';

/**
 *
 * @param input
 */
export function inputIsNotNullOrUndefined<T>(input: T | null | undefined): input is T {
	return input !== null && input !== undefined;
}

/**
 *
 */
export function isNotNullOrUndefined<T>() {
	return (source$: Observable<T | null | undefined>): Observable<T> =>
		source$.pipe(filter(inputIsNotNullOrUndefined));
}
