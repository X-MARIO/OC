import { CdkDrag } from '@angular/cdk/drag-drop';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateComponent } from '@oc/frontend/ui/create';
import { IconComponent } from '@oc/frontend/ui/icon';
import { MatrixComponent } from '@oc/frontend/ui/matrix';
import { TerminalComponent } from '@oc/frontend/ui/terminal';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';

/**
 * Dashboard page module
 */
@NgModule({
	declarations: [PageComponent],
	imports: [
		CommonModule,
		PageRoutingModule,
		MatrixComponent,
		IconComponent,
		CreateComponent,
		CdkDrag,
		TerminalComponent,
	],
})
export class PageModule {}
