import { ModalDeleteComponent } from './modal-delete.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([tuiGenerateDialogableRoute(ModalDeleteComponent)]),
	],
	declarations: [ModalDeleteComponent],
	exports: [ModalDeleteComponent],
})
export class ModalDeleteModule {}
