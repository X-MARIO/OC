import { MemoryStorage } from './memory.storage';

describe('memoryStorage', () => {
	let service: MemoryStorage;
	const key = 'ver1';
	const value = 'New Value';

	beforeEach(() => {
		service = new MemoryStorage();
	});

	it('should create', () => {
		expect.hasAssertions();
		expect(service).toBeTruthy();
	});

	it('should return value', () => {
		expect.hasAssertions();
		service.setItem(key, value);
		expect(service.getItem(key)).toBe(value);
	});

	it('should return correct length', () => {
		expect.hasAssertions();
		expect(service).toHaveLength(0);
		service.setItem(key, value);
		expect(service).toHaveLength(1);
	});

	it('should return remove item', () => {
		expect.hasAssertions();
		service.setItem(key, value);
		expect(service.getItem(key)).toBe(value);
		service.removeItem(key);
		expect(service.getItem(key)).toBeNull();
	});

	it('should clear storage', () => {
		expect.hasAssertions();
		service.setItem(key, value);
		service.clear();
		expect(service).toHaveLength(0);
	});
});
