import { Subject } from 'rxjs';

import type { OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
	public ngOnDestroy(): void {
		this.next();
		this.complete();
	}
}
