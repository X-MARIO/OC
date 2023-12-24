import { delay, switchMap, takeUntil, tap } from 'rxjs';

import { LoginForm } from './login.form';
import type { IFormModelLogin } from './login-form.types';
import { FormModelLogin } from './login-form.types';

import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import { AuthFacade } from '@oc/frontend/auth/facade';
import type { IUserLogin } from '@oc/frontend-api/types/user';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-auth-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class LoginFormComponent extends LoginForm implements OnInit {
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

	public onReset(): void {
		this.form.reset();
	}

	public onLogin(): void {
		this.form.markAsTouched();

		if (this.form.valid) {
			const formValue: IFormModelLogin = this.form.getRawValue() as IFormModelLogin;
			const payload: IUserLogin = {
				username: formValue[FormModelLogin.username],
				password: formValue[FormModelLogin.password],
			};
			this.authFacade.getProcess(payload);
		}
	}

	private initForm(): void {
		this.form = LoginForm.newForm();
	}

	/** Устанаваливаем подписки */
	private setSubscriptions(): void {
		this.authFacade.loginSuccess$
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

		this.authFacade.loginSuccess$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Вы успешно авторизованы',
						status: TuiNotification.Success,
						hasCloseButton: true,
						hasIcon: true,
						autoClose: 5000,
					});
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();

		this.authFacade.loginFailure$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Вы не авторизованы',
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
