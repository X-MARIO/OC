import { TerminalApiService } from './terminal-api.service';

import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';

@Injectable()
export class TerminalApiWrapperService extends TerminalApiService {
	public constructor(protected override readonly apiService: ApiService) {
		super(apiService);
	}
}
