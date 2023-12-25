import { NgModule } from '@angular/core';
import { AuthApiMockService } from './auth-api.mock.service';
import { AuthApiService } from './auth-api.service';

@NgModule({
	providers: [
		{
			provide: AuthApiService,
			useClass: AuthApiMockService,
		},
	],
})
export class AuthApiModule {}
