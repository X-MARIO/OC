import { NavigationExternalPathPipe } from './navigation-external-path.pipe';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@oc/core/api/service';
import { CONFIG_DEFAULT } from '@oc/core/config/service';
import { NAVIGATION_PATHS, PATHS_STUB } from '@oc/core/navigation/common';
import { NavigationService } from '@oc/core/navigation/service';

describe('navigationExternalPathPipe', () => {
	let pipe: NavigationExternalPathPipe;
	let apiService: ApiService;
	let navigationService: NavigationService;

	beforeEach(waitForAsync(() => {
		void TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [PATHS_STUB],
		}).compileComponents();

		apiService = TestBed.inject(ApiService);
		navigationService = TestBed.inject(NavigationService);
		pipe = new NavigationExternalPathPipe(navigationService, apiService);
	}));

	it('create an instance', () => {
		expect.hasAssertions();
		expect(pipe).toBeTruthy();
	});

	it('should return external path', () => {
		expect.hasAssertions();
		expect(pipe.transform(NAVIGATION_PATHS.business)).toBe(
			`${CONFIG_DEFAULT.apiHost}/${NAVIGATION_PATHS.business}`,
		);
	});
});
