import { IconComponent } from '@oc/frontend/ui/icon';
import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatrixComponent } from '@oc/frontend/ui/matrix';

/**
 * Dashboard page module
 */
@NgModule({
	declarations: [PageComponent],
	imports: [CommonModule, PageRoutingModule, MatrixComponent, IconComponent],
})
export class PageModule {}
