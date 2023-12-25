import { LocalSyncStorage } from './local-sync.storage';

import { Injectable } from '@angular/core';
import { AbstractAsyncStorage } from '@oc/core/storage/common';

@Injectable({
	providedIn: 'root',
})
export class LocalAsyncStorage extends AbstractAsyncStorage {
	public constructor(private readonly localSyncStorage: LocalSyncStorage) {
		super(localSyncStorage);
	}
}
