import { NavigationService } from './navigation.service';

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NAVIGATION_PATHS, PATHS_STUB } from '@oc/core/navigation/common';

describe('coreNavigationService', () => {
	let service: NavigationService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [NavigationService, PATHS_STUB],
		}).compileComponents();
		service = TestBed.inject(NavigationService);
	});

	it('should return service path', () => {
		expect.hasAssertions();
		expect(service.getRoute(NAVIGATION_PATHS.home)).toStrictEqual(['/', NAVIGATION_PATHS.home]);
	});
});
