import { switchMap, takeUntil } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import type { IMatrixElementBase, MatrixElementBase } from '@oc/frontend/ui/matrix';
import { MatrixEmitService } from '@oc/frontend/ui/matrix';
import { TUI_EDITOR_EXTENSIONS, TUI_IMAGE_LOADER, TuiEditorTool } from '@taiga-ui/addon-editor';
import { TuiDestroyService, TuiHandler } from '@taiga-ui/cdk';
import type { Observable } from 'rxjs';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-modal-editor',
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
export class ModalEditorComponent implements OnInit {
	public readonly builtInTools: TuiEditorTool[] = [TuiEditorTool.Img];

	public readonly base64Image$: Observable<string> = this.http
		.get('assets/images/lumberjack.png', { responseType: 'blob' })
		.pipe(switchMap((file: Blob) => this.imageLoader(file)));

	public control: FormControl<string | null> = new FormControl<string>('');

	private readonly matrixElementId: MatrixElementBase['_placeId'] = -1;

	public constructor(
		@Inject(TUI_IMAGE_LOADER)
		private readonly imageLoader: TuiHandler<Blob, Observable<string>>,
		@Inject(HttpClient) private readonly http: HttpClient,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
		@Inject(MatrixEmitService) private readonly matrixEmitService: MatrixEmitService,
		@Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
	) {
		const matrixElementId: string | null = this.activatedRoute.snapshot.paramMap.get('iconId');

		if (matrixElementId == null) {
			throw new Error('de84cd20-d78a-450e-850b-7584955629ab');
		}

		this.matrixElementId = +matrixElementId;

		this.base64Image$.pipe(takeUntil(this.destroy$)).subscribe({
			next: (src) => {
				this.control.patchValue(
					`<img data-type="image-editor" src="${src}" width="300"><p>Try to drag right border of image!</p><p>To change min size of image use token <code>TUI_EDITOR_MIN_IMAGE_WIDTH</code>.</p><p>To change max size of image use token <code>TUI_EDITOR_MAX_IMAGE_WIDTH</code>.</p>`,
				);
			},
		});
	}

	public ngOnInit(): void {
		this.setSubscriptions();
	}

	public onSave(): void {
		console.log('t', this.control.value);
	}

	private setSubscriptions(): void {
		this.matrixEmitService
			.getMatrixData()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (value: MatrixElementBase[][]) => {
					console.log('v', value);
				},
			});
	}
}
