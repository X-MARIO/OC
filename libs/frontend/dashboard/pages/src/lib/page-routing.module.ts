import type { Type } from '@angular/core';
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
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
