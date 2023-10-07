import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { IApiRequestOptions } from './api.util';
import { getApiRequestOptions } from './api.util';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@oc/core/config/service';
import type { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	public constructor(
		private readonly httpClient: HttpClient,
		private readonly configService: ConfigService,
	) {}

	public makeUrl(url: string): string {
		const configSettingPath: string = [
			this.configService.config.apiHost,
			this.configService.config.apiPrefix,
		]
			.filter(Boolean)
			.join('/');
		return url.startsWith('http') ? url : `${configSettingPath}${url}`;
	}

	public get<T = void>(url: string, options?: Partial<IApiRequestOptions>): Observable<T> {
		return this.httpClient
			.get<T>(this.makeUrl(url), getApiRequestOptions(options))
			.pipe(catchError((error: unknown) => throwError(() => error)));
	}

	public post<T = void>(
		url: string,
		body?: unknown | null,
		options?: Partial<IApiRequestOptions>,
	): Observable<T> {
		return this.httpClient
			.post<T>(this.makeUrl(url), body ?? null, getApiRequestOptions(options))
			.pipe(catchError((error: unknown) => throwError(() => error)));
	}

	public patch<T = void>(
		url: string,
		body: unknown | null,
		options?: Partial<IApiRequestOptions>,
	): Observable<T> {
		return this.httpClient
			.patch<T>(this.makeUrl(url), body, getApiRequestOptions(options))
			.pipe(catchError((error: unknown) => throwError(() => error)));
	}

	public put<T = void>(
		url: string,
		body: unknown | null,
		options?: Partial<IApiRequestOptions>,
	): Observable<T> {
		return this.httpClient
			.put<T>(this.makeUrl(url), body, getApiRequestOptions(options))
			.pipe(catchError((error: unknown) => throwError(() => error)));
	}

	public delete<T = void>(url: string, options?: Partial<IApiRequestOptions>): Observable<T> {
		return this.httpClient
			.delete<T>(this.makeUrl(url), getApiRequestOptions(options))
			.pipe(catchError((error: unknown) => throwError(() => error)));
	}
}
