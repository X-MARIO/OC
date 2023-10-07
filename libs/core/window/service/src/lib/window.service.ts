import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class WindowService {
	public constructor(@Inject(DOCUMENT) public readonly document: Document) {}

	public get window(): Window | never {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const window: Window | null = this.document?.defaultView ?? null;

		if (window === null) {
			throw new Error('Default view is not defined!');
		}

		return window;
	}
}
