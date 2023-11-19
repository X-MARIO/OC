import { switchMap, takeUntil } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	TUI_EDITOR_EXTENSIONS,
	TUI_IMAGE_LOADER,
	TuiEditorModule,
	TuiEditorSocketModule,
	TuiEditorTool,
} from '@taiga-ui/addon-editor';
import { TuiDestroyService, TuiHandler } from '@taiga-ui/cdk';
import type { Observable } from 'rxjs';

@Component({
	selector: 'oc-modal-editor',
	standalone: true,
	imports: [CommonModule, TuiEditorModule, TuiEditorSocketModule],
	providers: [
		TuiDestroyService,
		{
			provide: TUI_EDITOR_EXTENSIONS,
			deps: [Injector],
			useFactory: (injector: Injector) => [
				import('@taiga-ui/addon-editor/extensions/starter-kit').then((m) => m.StarterKit),
				import('@taiga-ui/addon-editor/extensions/image-editor').then((m) =>
					m.createImageEditorExtension(injector),
				),
			],
		},
	],
	templateUrl: './modal-editor.component.html',
	styleUrls: ['./modal-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalEditorComponent {
	public readonly builtInTools: TuiEditorTool[] = [TuiEditorTool.Img];

	public readonly base64Image$: Observable<string> = this.http
		.get('assets/images/lumberjack.png', { responseType: 'blob' })
		.pipe(switchMap((file: Blob) => this.imageLoader(file)));

	public control: FormControl<string | null> = new FormControl<string>('');

	public constructor(
		@Inject(TUI_IMAGE_LOADER)
		private readonly imageLoader: TuiHandler<Blob, Observable<string>>,
		@Inject(HttpClient) private readonly http: HttpClient,
		@Inject(TuiDestroyService) destroy$: TuiDestroyService,
	) {
		this.base64Image$.pipe(takeUntil(destroy$)).subscribe({
			next: (src) => {
				this.control.patchValue(
					`<img data-type="image-editor" src="${src}" width="300"><p>Try to drag right border of image!</p><p>To change min size of image use token <code>TUI_EDITOR_MIN_IMAGE_WIDTH</code>.</p><p>To change max size of image use token <code>TUI_EDITOR_MAX_IMAGE_WIDTH</code>.</p>`,
				);
			},
		});
	}
}
