import { ModalCreateFolderComponent } from './modal-create-folder.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import {
	TuiFieldErrorPipeModule,
	tuiGenerateDialogableRoute,
	TuiInputModule,
	TuiInputNumberModule,
} from '@taiga-ui/kit';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([tuiGenerateDialogableRoute(ModalCreateFolderComponent)]),
		ReactiveFormsModule,
		TuiButtonModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiInputModule,
		TuiInputNumberModule,
	],
	declarations: [ModalCreateFolderComponent],
	exports: [ModalCreateFolderComponent],
})
export class ModalCreateFolderModule {}
