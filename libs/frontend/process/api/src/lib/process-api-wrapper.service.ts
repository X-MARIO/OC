import { ProcessApiService } from './process-api.service';

import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';

@Injectable()
export class ProcessApiWrapperService extends ProcessApiService {
	public constructor(protected override readonly apiService: ApiService) {
		super(apiService);
	}
}
