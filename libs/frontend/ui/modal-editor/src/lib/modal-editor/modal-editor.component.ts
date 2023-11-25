import { tuiCreateImageEditorExtension } from '@taiga-ui/addon-editor/extensions/image-editor/image-editor.extension';
import { map, take, takeUntil } from 'rxjs/operators';

import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@oc/core/navigation/service';
import { MatrixElement, MatrixEmitService } from '@oc/frontend/ui/matrix';
import { TUI_EDITOR_EXTENSIONS, TuiEditorTool } from '@taiga-ui/addon-editor';
import { TuiDestroyService } from '@taiga-ui/cdk';

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
					m.tuiCreateImageEditorExtension({ injector }),
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

	public element!: MatrixElement;

	public control: FormControl<string | null> = new FormControl<string>('');

	private readonly matrixElementId: MatrixElement['_iconId'] = -1;

	public constructor(
		@Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
		private readonly matrixEmitService: MatrixEmitService<MatrixElement>,
		private readonly navigationService: NavigationService,
	) {
		const matrixElementId: string | null =
			this.activatedRoute.snapshot.queryParamMap.get('iconId');

		if (matrixElementId == null) {
			throw new Error('de84cd20-d78a-450e-850b-7584955629ab');
		}

		this.matrixElementId = +matrixElementId;
	}

	public ngOnInit(): void {
		this.setSubscriptions();
	}

	public onSave(): void {
		this.matrixEmitService
			.update(
				new MatrixElement({
					...this.element,
					_content: this.control.value ?? '',
				}),
			)
			.pipe(take(1), takeUntil(this.destroy$))
			.subscribe({
				next: () => {
					void this.navigationService
						.navigateByUrl(this.navigationService.getPaths().dashboard)
						.then()
						.catch();
				},
			});
	}

	private setSubscriptions(): void {
		this.matrixEmitService
			.getMatrixData$()
			.pipe(
				take(1),
				map((matrix: MatrixElement[][]) => {
					const el: MatrixElement[] | undefined = matrix.find(
						(value: MatrixElement[]) => value[0]?.iconId === this.matrixElementId,
					);

					if (!el) {
						throw new Error('');
					}

					const matrixEl: MatrixElement | undefined = el[0];

					if (matrixEl === undefined) {
						throw new Error('');
					}

					this.control.patchValue(matrixEl.content);

					return el[0];
				}),
				takeUntil(this.destroy$),
			)
			.subscribe({
				next: (matrixEl: MatrixElement) => {
					this.element = matrixEl;
				},
			});
	}
}
