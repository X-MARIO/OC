import { ModalEditorComponent } from './modal-editor.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiEditorModule, TuiEditorSocketModule } from '@taiga-ui/addon-editor';
import { TuiButtonModule } from '@taiga-ui/core';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';

@NgModule({
	imports: [
		CommonModule,
		TuiEditorModule,
		TuiEditorSocketModule,
		ReactiveFormsModule,
		RouterModule.forChild([tuiGenerateDialogableRoute(ModalEditorComponent)]),
		TuiButtonModule,
	],
	declarations: [ModalEditorComponent],
	exports: [ModalEditorComponent],
})
export class ModalEditorModule {}
