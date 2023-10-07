import { AccessTokenCheckGuard } from './access-token-check-guard.service';
import { AuthGuard } from './auth.guard';

import { NgModule } from '@angular/core';

@NgModule({
	providers: [AuthGuard, AccessTokenCheckGuard],
})
export class AuthGuardsModule {}
