import type { IConfig } from './config.interface';
import { ConfigService } from './config.service';

describe('configService', () => {
	let service: ConfigService;

	const configStub: IConfig = {
		apiHost: '',
		version: 'local',
	};

	beforeEach(() => {
		service = new ConfigService();
	});

	it('should create', () => {
		expect.hasAssertions();
		expect(service).toBeTruthy();
	});

	it('should return config', () => {
		expect.hasAssertions();
		expect(service.config).toStrictEqual(configStub);
	});
});
