import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import type { IUserAuth } from '@oc/frontend-api/types/user';
import type { Observable } from 'rxjs';

export enum ProcessApiRoutesEnum {
	PROCESS = 'process',
}

export const PROCESS_API_ROUTES: Record<ProcessApiRoutesEnum, string> = {
	[ProcessApiRoutesEnum.PROCESS]: '/process',
};

@Injectable()
export class ProcessApiService {
	public constructor(private readonly apiService: ApiService) {}

	public get(): Observable<IUserAuth> {
		return this.apiService.post<IUserAuth>(PROCESS_API_ROUTES[ProcessApiRoutesEnum.PROCESS]);
	}
}
