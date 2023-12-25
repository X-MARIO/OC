import { ModalAboutModule } from '../../../../ui/modal-about/src/lib/modal-about/modal-about.module';
import { PageComponent } from './page.component';

import type { Type } from '@angular/core';
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import type { ModalCreateFolderModule } from '@oc/frontend/ui/modal-create-folder';
import type { ModalDeleteModule } from '@oc/frontend/ui/modal-delete';
import type { ModalEditorModule } from '@oc/frontend/ui/modal-editor';
import type { ModalRenameModule } from '@oc/frontend/ui/modal-rename';
import type { ModalProcessModule } from 'modal-process';

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
	{
		path: 'file/delete',
		loadChildren: async (): Promise<Type<ModalDeleteModule>> => {
			return import('@oc/frontend/ui/modal-delete').then(
				(m: { ModalDeleteModule: Type<ModalDeleteModule> }) => m.ModalDeleteModule,
			);
		},
	},
	{
		path: 'create',
		loadChildren: async (): Promise<Type<ModalCreateFolderModule>> => {
			return import('@oc/frontend/ui/modal-create-folder').then(
				(m: { ModalCreateFolderModule: Type<ModalCreateFolderModule> }) =>
					m.ModalCreateFolderModule,
			);
		},
	},
	{
		path: 'process',
		loadChildren: async (): Promise<Type<ModalProcessModule>> => {
			return import('modal-process').then(
				(m: { ModalProcessModule: Type<ModalProcessModule> }) => m.ModalProcessModule,
			);
		},
	},
	{
		path: 'about',
		loadChildren: async (): Promise<Type<ModalAboutModule>> => {
			return import('modal-about').then(
				(m: { ModalAboutModule: Type<ModalAboutModule> }) => m.ModalAboutModule,
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
