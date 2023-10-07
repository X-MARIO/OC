import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';

import { NgModule } from '@angular/core';

/**
 * Dashboard page module
 */
@NgModule({
	declarations: [PageComponent],
	imports: [PageRoutingModule],
})
export class PageModule {}
