import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import type { Observable } from 'rxjs';
import type { ITerminalCommand } from 'types-terminal';

export enum ProcessApiRoutesEnum {
	TERMINAL = 'terminal',
}

export const TERMINAL_API_ROUTES: Record<ProcessApiRoutesEnum, string> = {
	[ProcessApiRoutesEnum.TERMINAL]: '/terminal',
};

@Injectable()
export class TerminalApiService {
	public constructor(protected readonly apiService: ApiService) {}

	public get(command: ITerminalCommand): Observable<string> {
		return this.apiService.get<string>(TERMINAL_API_ROUTES[ProcessApiRoutesEnum.TERMINAL], {
			params: {
				command,
			},
		});
	}
}
