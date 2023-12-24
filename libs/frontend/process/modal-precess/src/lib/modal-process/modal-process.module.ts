import { ModalProcessComponent } from './modal-process.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';
import { ProcessStateModule } from 'ngxs-process-state';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([tuiGenerateDialogableRoute(ModalProcessComponent)]),
		TuiButtonModule,
		ProcessStateModule,
	],
	declarations: [ModalProcessComponent],
	exports: [ModalProcessComponent],
})
export class ModalProcessModule {}
