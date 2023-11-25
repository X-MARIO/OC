import { ModalDeleteComponent } from './modal-delete.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([tuiGenerateDialogableRoute(ModalDeleteComponent)]),
		TuiButtonModule,
	],
	declarations: [ModalDeleteComponent],
	exports: [ModalDeleteComponent],
})
export class ModalDeleteModule {}
