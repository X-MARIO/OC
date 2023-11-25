import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiEditorModule, TuiEditorSocketModule } from '@taiga-ui/addon-editor';
import { TuiButtonModule } from '@taiga-ui/core';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';
import { ModalRenameComponent } from './modal-rename.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([tuiGenerateDialogableRoute(ModalRenameComponent)]),
		TuiButtonModule,
		TuiEditorModule,
		TuiEditorSocketModule,
	],
	declarations: [ModalRenameComponent],
	exports: [ModalRenameComponent],
})
export class ModalRenameModule {}
