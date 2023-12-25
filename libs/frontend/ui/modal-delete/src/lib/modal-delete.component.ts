import { ChangeDetectionStrategy, Component, Inject, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { MatrixFacade } from 'matrix-facade';
import { delay, Observable, switchMap, tap } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { MatrixElement } from 'types-matrix';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'lib-modal-delete',
	templateUrl: './modal-delete.component.html',
	styleUrls: ['./modal-delete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComponent implements OnInit {
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

	public onDelete(): void {
		this.matrixFacade.deleteElMatrix(this.element.placeId);
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

					return el[0];
				}),
				takeUntil(this.destroy$),
			)
			.subscribe({
				next: (matrixEl: MatrixElement) => {
					this.element = matrixEl;
				},
			});

		this.matrixFacade.deleteElMatrixSuccess$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Файл успешно удалён',
						status: TuiNotification.Success,
						hasCloseButton: true,
						hasIcon: true,
						autoClose: 5000,
					});
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		this.matrixFacade.deleteElMatrixSuccess$
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

		this.matrixFacade.deleteElMatrixFailure$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Не удалось удалить файл',
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
