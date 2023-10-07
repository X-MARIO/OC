import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IApiRequestOptions {
	headers: Record<string, any>;
	params: Record<string, any>;
	reportProgress: boolean;
	observe: any;
	responseType: any;
	withCredentials: boolean;
}

/**
 * @param options Partial<IApiRequestOptions>
 * @returns Partial<IApiRequestOptions> | undefined
 */
export function getApiRequestOptions(
	options?: Partial<IApiRequestOptions>,
): Partial<IApiRequestOptions> | undefined {
	if (options) {
		let params: HttpParams | Record<string, any> = {};
		let headers: Record<string, any> = {};
		if (options.headers) {
			headers = !(options?.headers instanceof HttpHeaders)
				? new HttpHeaders(options.headers)
				: options.headers;
		}
		if (options.params) {
			params = new HttpParams();

			for (const propKey of Object.keys(options.params).sort()) {
				if (options.params[propKey] !== undefined) {
					if (Array.isArray(options.params[propKey])) {
						options.params[propKey].forEach((item: any) => {
							params = params.append(
								`${propKey}[]`,
								item == null ? 'NULL' : item.toString(),
							);
						});
					} else {
						params = params.append(
							propKey,
							options.params[propKey] == null
								? 'NULL'
								: options.params[propKey].toString(),
						);
					}
				}
			}
		}

		return { ...options, params, headers };
	}

	return;
}
