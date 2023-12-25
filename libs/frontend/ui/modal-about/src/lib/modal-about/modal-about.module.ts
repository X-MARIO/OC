import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiCarouselModule, tuiGenerateDialogableRoute, TuiTagModule } from '@taiga-ui/kit';
import { ModalAboutComponent } from './modal-about.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			tuiGenerateDialogableRoute(ModalAboutComponent, {
				size: 'fullscreen',
			}),
		]),
		TuiTagModule,
	],
	declarations: [ModalAboutComponent],
	exports: [ModalAboutComponent],
})
export class ModalAboutModule {}
