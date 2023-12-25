import { ChangeDetectionStrategy, Component, Inject, type OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { MatrixFacade } from 'matrix-facade';
import type { Observable } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { MatrixElement } from 'types-matrix';
import { FormModelRename } from './rename-form.types';
import { RenameForm } from './rename.form';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'lib-modal-rename',
	templateUrl: './modal-rename.component.html',
	styleUrls: ['./modal-rename.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalRenameComponent extends RenameForm implements OnInit {
	// @ts-ignore
	public readonly matrix$: Observable<MatrixElement[][]> = this.matrixFacade.matrix$;

	public element!: MatrixElement;

	private readonly matrixElementId: MatrixElement['_iconId'] = -1;

	public constructor(
		@Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		private readonly matrixFacade: MatrixFacade,
		private readonly navigationService: NavigationService,
	) {
		super();
		const matrixElementId: string | null =
			this.activatedRoute.snapshot.queryParamMap.get('iconId');

		if (matrixElementId == null) {
			throw new Error('de84cd20-d78a-450e-850b-7584955629ab');
		}

		this.matrixElementId = +matrixElementId;
	}

	public ngOnInit(): void {
		this.initForm();
		this.setSubscriptions();
	}

	public onClose(): void {
		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboard)
			.then()
			.catch();
	}

	public onRename(): void {
		this.matrixFacade.updateElMatrix(
			new MatrixElement({
				...this.element,
				_name: this.getFormField(FormModelRename.fileName).value ?? '',
			}),
		);
	}

	private initForm(): void {
		this.form = RenameForm.newForm();
	}

	private getFormField(fromField: FormModelRename): FormControl {
		return this.form.get(fromField) as FormControl;
	}

	private setSubscriptions(): void {
		this.matrix$
			.pipe(
				take(1),
				map((matrix: MatrixElement[][]) => {
					console.log('matrix', matrix);
					console.log('this.matrixElementId', this.matrixElementId);
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

					this.getFormField(FormModelRename.fileName).patchValue(matrixEl.name);

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
						label: 'Имя файла успешно обновлено',
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
						label: 'Не удалось обновить имя файла',
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
