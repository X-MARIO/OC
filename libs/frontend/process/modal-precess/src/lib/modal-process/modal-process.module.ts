import { ModalProcessComponent } from './modal-process.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';
import { ModalProcessErrorComponent } from 'modal-process-error';
import { ProcessStateModule } from 'ngxs-process-state';
import { TableProcessComponent } from 'table-process';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			tuiGenerateDialogableRoute(ModalProcessComponent, {
				size: 'auto',
			}),
		]),
		TuiButtonModule,
		ProcessStateModule,
		TableProcessComponent,
		TuiLoaderModule,
		ModalProcessErrorComponent,
	],
	declarations: [ModalProcessComponent],
	exports: [ModalProcessComponent],
})
export class ModalProcessModule {}
