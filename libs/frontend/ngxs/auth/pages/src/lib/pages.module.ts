import { PagesRoutingModule } from './pages-routing.module';

import { NgModule } from '@angular/core';
import { AuthStateModule } from '@oc/frontend/ngxs/auth/state';

@NgModule({
	imports: [AuthStateModule, PagesRoutingModule],
})
export class PagesModule {}
