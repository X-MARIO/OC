import { ENVIRONMENTS_DEFAULT } from './environment.interface';
import { EnvironmentService } from './environment.service';

describe('environmentService', () => {
	let service: EnvironmentService;

	beforeEach(() => {
		service = new EnvironmentService(null);
	});

	it('should create', () => {
		expect.hasAssertions();
		expect(service).toBeTruthy();
	});

	it('should return getEnvironments', () => {
		expect.hasAssertions();
		expect(service.getEnvironments()).toStrictEqual(ENVIRONMENTS_DEFAULT);
	});
});
