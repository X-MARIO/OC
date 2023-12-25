import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import { MatrixApiService } from './matrix-api.service';

@Injectable()
export class MatrixApiWrapperService extends MatrixApiService {
	public constructor(protected override readonly apiService: ApiService) {
		super(apiService);
	}
}
