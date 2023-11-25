import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';
import { ModalRenameComponent } from './modal-rename.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([tuiGenerateDialogableRoute(ModalRenameComponent)]),
	],
	declarations: [ModalRenameComponent],
	exports: [ModalRenameComponent],
})
export class ModalRenameModule {}
