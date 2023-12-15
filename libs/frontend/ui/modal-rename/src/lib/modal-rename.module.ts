import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiEditorModule, TuiEditorSocketModule } from '@taiga-ui/addon-editor';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import {
	TuiFieldErrorPipeModule,
	tuiGenerateDialogableRoute,
	TuiInputModule,
	TuiInputMonthModule,
} from '@taiga-ui/kit';
import { ModalRenameComponent } from './modal-rename.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([tuiGenerateDialogableRoute(ModalRenameComponent)]),
		TuiButtonModule,
		TuiEditorModule,
		TuiEditorSocketModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiInputModule,
		TuiInputMonthModule,
		ReactiveFormsModule,
	],
	declarations: [ModalRenameComponent],
	exports: [ModalRenameComponent],
})
export class ModalRenameModule {}
