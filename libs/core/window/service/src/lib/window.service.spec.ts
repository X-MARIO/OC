import { WindowService } from './window.service';

import { TestBed } from '@angular/core/testing';

describe('windowService', () => {
	let service: WindowService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WindowService);
	});

	it('should be created', () => {
		expect.hasAssertions();
		expect(service).toBeTruthy();
	});

	it.todo('should be browser');

	it.todo('should be node.js server');
});
