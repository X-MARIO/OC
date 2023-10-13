import { CdkDrag, CdkDragPlaceholder, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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

		//
		CdkDrag,
		CdkDropList,
		CdkDropListGroup,
		CdkDragPlaceholder,
	],
})
export class PageModule {}
