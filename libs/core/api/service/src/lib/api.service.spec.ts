import { ApiService } from './api.service';
import { API_ERROR_RESPONSE_STUB, API_ERROR_STUB } from './api.stub';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('apiService', () => {
	let httpTestingController: HttpTestingController;
	let service: ApiService;
	const path = '/api/path';

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ApiService],
		}).compileComponents();

		httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ApiService);
	});

	it('should create', () => {
		expect.hasAssertions();
		expect(service).toBeTruthy();
	});

	describe('get()', () => {
		it('should return get response', () => {
			expect.hasAssertions();
			service.get(path).subscribe({
				next: (data) => {
					expect(data).toBeNull();
				},
			});
			const req = httpTestingController.expectOne(path);
			expect(req.request.method).toBe('GET');

			req.flush(null);
		});

		it('should return get error', () => {
			expect.hasAssertions();
			service.get(path).subscribe({
				error: (data: unknown) => {
					expect(data.error).toStrictEqual(API_ERROR_STUB);
				},
			});

			const req = httpTestingController.expectOne(path);
			req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
		});
	});

	describe('post()', () => {
		it('should return post response', () => {
			expect.hasAssertions();
			service.post(path).subscribe({
				next: (data) => {
					expect(data).toBeNull();
				},
			});
			const req = httpTestingController.expectOne(path);
			expect(req.request.method).toBe('POST');

			req.flush(null);
		});

		it('should return post error', () => {
			expect.hasAssertions();
			service.post(path).subscribe({
				error: (data: unknown) => {
					expect(data.error).toStrictEqual(API_ERROR_STUB);
				},
			});

			const req = httpTestingController.expectOne(path);
			req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
		});
	});

	describe('put()', () => {
		it('should return put response', () => {
			expect.hasAssertions();
			service.put(path, {}).subscribe({
				next: (data) => {
					expect(data).toBeNull();
				},
			});
			const req = httpTestingController.expectOne(path);
			expect(req.request.method).toBe('PUT');

			req.flush(null);
		});

		it('should return put error', () => {
			expect.hasAssertions();
			service.put(path, {}).subscribe({
				error: (data: unknown) => {
					expect(data.error).toStrictEqual(API_ERROR_STUB);
				},
			});

			const req = httpTestingController.expectOne(path);
			req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
		});
	});

	describe('patch()', () => {
		it('should return patch response', () => {
			service.patch(path, {}).subscribe({
				next: (data) => {
					expect(data).toBeNull();
				},
			});
			const req = httpTestingController.expectOne(path);
			expect(req.request.method).toBe('PATCH');

			req.flush(null);
		});

		it('should return patch error', () => {
			expect.hasAssertions();
			service.patch(path, {}).subscribe({
				error: (data: unknown) => {
					expect(data.error).toStrictEqual(API_ERROR_STUB);
				},
			});

			const req = httpTestingController.expectOne(path);
			req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
		});
	});

	describe('delete()', () => {
		it('should return delete response', () => {
			expect.hasAssertions();
			service.delete(path).subscribe({
				next: (data) => {
					expect(data).toBeNull();
				},
			});
			const req = httpTestingController.expectOne(path);
			expect(req.request.method).toBe('DELETE');

			req.flush(null);
		});

		it('should return delete error', () => {
			expect.hasAssertions();
			service.patch(path, {}).subscribe({
				error: (data: unknown) => {
					expect(data.error).toStrictEqual(API_ERROR_STUB);
				},
			});

			const req = httpTestingController.expectOne(path);
			req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
		});
	});
});
