import type { Type } from '@angular/core';
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ModalRenameModule } from '@oc/frontend/ui/modal-rename';
import { ModalEditorModule } from '../../../../ui/modal-editor/src/lib/modal-editor/modal-editor.module';
import { PageComponent } from './page.component';

/**
 * Dashboard page
 */
const routes: Routes = [
	{
		path: '',
		component: PageComponent,
	},
	{
		path: 'file/edit',
		loadChildren: async (): Promise<Type<ModalEditorModule>> => {
			return import('@oc/frontend/ui/modal-editor').then(
				(m: { ModalEditorModule: Type<ModalEditorModule> }) => m.ModalEditorModule,
			);
		},
	},
	{
		path: 'file/rename',
		loadChildren: async (): Promise<Type<ModalRenameModule>> => {
			return import('@oc/frontend/ui/modal-rename').then(
				(m: { ModalRenameModule: Type<ModalRenameModule> }) => m.ModalRenameModule,
			);
		},
	},
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/**
 * Dashboard page
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PageRoutingModule {}
