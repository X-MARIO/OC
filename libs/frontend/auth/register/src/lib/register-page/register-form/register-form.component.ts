import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import type { IUserCreate } from '@oc/frontend-api/types/user';
import { AuthFacade } from '@oc/frontend/auth/facade';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { delay, switchMap, takeUntil, tap } from 'rxjs';
import type { IFormModelRegister } from './register-form.types';
import { FormModelRegister } from './register-form.types';

import { RegisterForm } from './register.form';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-auth-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class RegisterFormComponent extends RegisterForm implements OnInit {
	public constructor(
		private readonly authFacade: AuthFacade,
		private readonly navigationService: NavigationService,

		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
	) {
		super();
	}

	public ngOnInit(): void {
		this.initForm();
		this.setSubscriptions();
	}

	public onLogin(): void {
		this.navigationService
			.navigateByUrl(this.navigationService.getPaths().authLogin)
			.then()
			.catch();
	}

	public onReset(): void {
		this.form.reset();
	}

	public onRegister(): void {
		this.form.markAsTouched();

		if (this.form.valid) {
			const formValue: IFormModelRegister = this.form.value as IFormModelRegister;
			const payload: IUserCreate = {
				email: formValue[FormModelRegister.email],
				username: formValue[FormModelRegister.username],
				password: formValue[FormModelRegister.password],
			};
			this.authFacade.register(payload);
		}
	}

	private initForm(): void {
		this.form = RegisterForm.newForm();
	}

	/** Устанаваливаем подписки */
	private setSubscriptions(): void {
		this.authFacade.registerSuccess$
			.pipe(
				delay(2000),
				tap({
					next: () => {
						void this.navigationService
							.navigateByUrl(this.navigationService.getPaths().dashboard)
							.then()
							.catch();
					},
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		this.authFacade.registerSuccess$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Вы успешно зарегистрировались',
						status: TuiNotification.Success,
						hasCloseButton: true,
						hasIcon: true,
						autoClose: 5000,
					});
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		this.authFacade.registerFailure$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Вы не зарегистрированы',
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
