import { ChangeDetectionStrategy, Component, Inject, type OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { MatrixFacade } from 'matrix-facade';
import { delay, switchMap, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EFileType, MatrixElement } from 'types-matrix';
import { CreateFolderForm } from './create-folder.form';
import { FormModelCreateItem } from './create-folder.types';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'lib-modal-create-folder',
	templateUrl: './modal-create-folder.component.html',
	styleUrls: ['./modal-create-folder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCreateFolderComponent extends CreateFolderForm implements OnInit {
	public readonly eFileType: typeof EFileType = EFileType;

	public readonly fileType: MatrixElement['_mime'] = EFileType.FOLDER;

	private readonly placeId: number = -1;

	public constructor(
		@Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		private readonly matrixFacade: MatrixFacade,
		private readonly navigationService: NavigationService,
	) {
		super();
		const placeId: string | null = this.activatedRoute.snapshot.queryParamMap.get('iconId');

		const fileType: EFileType | null = this.activatedRoute.snapshot.queryParamMap.get(
			'fileType',
		) as EFileType;

		if (placeId == null) {
			throw new Error('');
		}

		if (fileType == null) {
			throw new Error('');
		}

		this.placeId = +placeId;
		this.fileType = fileType;
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

	public onCreate(): void {
		const newEl: MatrixElement = new MatrixElement({
			_placeId: this.placeId,
			_name: this.getFormField(FormModelCreateItem.itemName).value,
			_icon: this.fileType === EFileType.FOLDER ? 'tuiIconFolderLarge' : 'tuiIconFileLarge',
			_mime: this.fileType,
			_iconId: this.placeId,
			_content: '',
		});
		this.matrixFacade.createEl(newEl);
	}

	private initForm(): void {
		this.form = CreateFolderForm.newForm();
	}

	private getFormField(fromField: FormModelCreateItem): FormControl {
		return this.form.get(fromField) as FormControl;
	}

	private setSubscriptions(): void {
		this.matrixFacade.createElMatrixSuccess$
			.pipe(
				switchMap(() => {
					let label: string = '';
					switch (this.fileType) {
						case EFileType.FOLDER:
							label = `Папка успешно создана`;
							break;
						case EFileType.FILE:
							label = `Файл успешно создан`;
							break;
						default:
							label = `Сущность успешно создана`;
					}

					return this.alerts$.open(undefined, {
						label,
						status: TuiNotification.Success,
						hasCloseButton: true,
						hasIcon: true,
						autoClose: 5000,
					});
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		this.matrixFacade.createElMatrixSuccess$
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

		this.matrixFacade.createElMatrixFailure$
			.pipe(
				switchMap(() => {
					let label: string = '';
					switch (this.fileType) {
						case EFileType.FOLDER:
							label = `Не удалось создать папку`;
							break;
						case EFileType.FILE:
							label = `Не удалось создать файл`;
							break;
						default:
							label = `Не удалось создать сущность`;
					}

					return this.alerts$.open(undefined, {
						label,
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
