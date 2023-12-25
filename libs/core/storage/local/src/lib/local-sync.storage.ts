import { Injectable } from '@angular/core';
import { AbstractSyncStorage, storageAvailable } from '@oc/core/storage/common';
import { MemoryStorage } from '@oc/core/storage/memory';

@Injectable({
	providedIn: 'root',
})
export class LocalSyncStorage extends AbstractSyncStorage {
	public constructor() {
		super(storageAvailable('localStorage') ? window.localStorage : new MemoryStorage());
	}
}
