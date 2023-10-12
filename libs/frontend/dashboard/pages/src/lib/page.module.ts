import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';

import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/**
 * Dashboard page module
 */
@NgModule({
	declarations: [PageComponent],
	imports: [
		CommonModule,
		PageRoutingModule,

		//
		CdkDrag,
		CdkDropList,
	],
})
export class PageModule {}
