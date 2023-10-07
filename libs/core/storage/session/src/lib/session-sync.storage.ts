import { Injectable } from '@angular/core';
import { AbstractSyncStorage, storageAvailable } from '@oc/core/storage/common';
import { MemoryStorage } from '@oc/core/storage/memory';
@Injectable({
	providedIn: 'root',
})
export class SessionSyncStorage extends AbstractSyncStorage {
	public constructor() {
		super(storageAvailable('sessionStorage') ? window.sessionStorage : new MemoryStorage());
	}
}
