import { SessionAsyncStorage } from './session-async.storage';
import { SessionSyncStorage } from './session-sync.storage';

import { TestBed } from '@angular/core/testing';

describe('sessionAsyncStorage', () => {
	let service: SessionAsyncStorage;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [SessionAsyncStorage, SessionSyncStorage],
		}).compileComponents();

		service = TestBed.inject(SessionAsyncStorage);
	});

	it('should create', () => {
		expect.hasAssertions();
		expect(service).toBeTruthy();
	});
});
