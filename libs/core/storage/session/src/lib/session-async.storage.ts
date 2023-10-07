import { SessionSyncStorage } from './session-sync.storage';

import { Injectable } from '@angular/core';
import { AbstractAsyncStorage } from '@oc/core/storage/common';

@Injectable({
	providedIn: 'root',
})
export class SessionAsyncStorage extends AbstractAsyncStorage {
	public constructor(private readonly localSyncStorage: SessionSyncStorage) {
		super(localSyncStorage);
	}
}
