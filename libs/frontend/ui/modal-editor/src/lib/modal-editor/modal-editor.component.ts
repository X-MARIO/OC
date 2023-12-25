import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@oc/core/navigation/service';
import { TUI_EDITOR_EXTENSIONS, TuiEditorTool } from '@taiga-ui/addon-editor';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { MatrixFacade } from 'matrix-facade';
import { delay, Observable, switchMap, tap } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { MatrixElement } from 'types-matrix';

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

	// @ts-ignore
	public readonly matrix$: Observable<MatrixElement[][]> = this.matrixFacade.matrix$;

	private readonly matrixElementId: MatrixElement['_iconId'] = -1;

	public constructor(
		@Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		private readonly matrixFacade: MatrixFacade,
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

	public onClose(): void {
		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboard)
			.then()
			.catch();
	}

	public onSave(): void {
		this.matrixFacade.updateElMatrix(
			new MatrixElement({
				...this.element,
				_content: this.control.value ?? '',
			}),
		);
	}

	private setSubscriptions(): void {
		this.matrix$
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

		this.matrixFacade.updateElMatrixSuccess$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Файл успешно обновлён',
						status: TuiNotification.Success,
						hasCloseButton: true,
						hasIcon: true,
						autoClose: 5000,
					});
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		this.matrixFacade.updateElMatrixSuccess$
			.pipe(
				delay(1000),
				tap({
					next: () => {
						this.onClose();
					},
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		this.matrixFacade.updateElMatrixFailure$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Не удалось обновить файл',
						status: TuiNotification.Error,
						hasCloseButton: true,
						hasIcon: true,
						autoClose: 5000,
					});
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();
	}
}
