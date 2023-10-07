import { NgxsAuthFacade } from './auth.facade';
import { AuthState } from './auth.state';

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthApiModule } from '@oc/frontend/auth/api/service';
import { AuthFacade } from '@oc/frontend/auth/facade';

/**
 * Ngxs feature store for auth entities.
 */
@NgModule({
	imports: [AuthApiModule, NgxsModule.forFeature([AuthState])],
	providers: [
		{
			provide: AuthFacade,
			useClass: NgxsAuthFacade,
		},
	],
})
export class AuthStateModule {}
