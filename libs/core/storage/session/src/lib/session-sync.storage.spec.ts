import { SessionSyncStorage } from './session-sync.storage';

import { TestBed } from '@angular/core/testing';

describe('sessionSyncStorage', () => {
	let service: SessionSyncStorage;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [SessionSyncStorage],
		}).compileComponents();

		service = TestBed.inject(SessionSyncStorage);
	});

	it('should create', () => {
		expect.hasAssertions();
		expect(service).toBeTruthy();
	});
});
