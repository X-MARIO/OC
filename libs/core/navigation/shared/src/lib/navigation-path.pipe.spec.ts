import { NavigationPathPipe } from './navigation-path.pipe';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NAVIGATION_PATHS, PATHS_STUB } from '@oc/core/navigation/common';
import { NavigationService } from '@oc/core/navigation/service';

describe('navigationPathPipe', () => {
	let pipe: NavigationPathPipe;

	beforeEach(waitForAsync(() => {
		void TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [PATHS_STUB],
		}).compileComponents();
		pipe = new NavigationPathPipe(TestBed.inject(NavigationService));
	}));

	it('create an instance', () => {
		expect.hasAssertions();
		expect(pipe).toBeTruthy();
	});

	it('should return path', () => {
		expect.hasAssertions();
		expect(pipe.transform(NAVIGATION_PATHS.business)).toBe('/business');
		expect(pipe.transform(NAVIGATION_PATHS.businessSales)).toBe('/business/sales');
		expect(pipe.transform(NAVIGATION_PATHS.home)).toBe('/');
	});
});
