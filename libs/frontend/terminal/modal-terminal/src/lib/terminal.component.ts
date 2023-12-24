import { map, switchMap, takeUntil } from 'rxjs';

import { TerminalForm } from './terminal.form';
import { TerminalService } from './terminal.service';
import { FormModelTerminal } from './terminal-form.types';

import { CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, type OnInit } from '@angular/core';
import type { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButtonModule, TuiErrorModule, TuiNotification } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiTextareaModule } from '@taiga-ui/kit';
import { TerminalStateModule } from 'ngxs-terminal-state';
import type { Observable } from 'rxjs';
import { State } from 'store-root';
import { TerminalFacade } from 'terminal-facade';
import type { Message } from 'types-terminal';
import { EAuthor } from 'types-terminal';

export interface ICommand {
	readonly uuid: string;
	readonly youRequest: string;
	readonly systemResponse: string;
}

@Component({
	selector: 'lib-terminal',
	standalone: true,
	imports: [
		CommonModule,
		CdkDrag,
		ReactiveFormsModule,
		TuiButtonModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiInputModule,
		TuiTextareaModule,
		TerminalStateModule,
	],
	templateUrl: './terminal.component.html',
	styleUrls: ['./terminal.component.scss'],
	providers: [TuiDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalComponent extends TerminalForm implements OnInit {
	public open$: Observable<boolean> = this._terminalService.getOpenTerminal$();

	public state$: TerminalFacade['state$'] = this.terminalFacade.state$;

	public messages$: TerminalFacade['messages$'] = this.terminalFacade.messages$;

	public isLoading$: Observable<boolean> = this.terminalFacade.state$.pipe(
		map((state: State) => state === State.PENDING),
	);

	public readonly stateEnum: typeof State = State;

	public readonly authorEnum: typeof EAuthor = EAuthor;

	public commands$: Observable<ICommand[]> = this.messages$.pipe(
		map((messages: Message[]) => {
			console.log('messages', messages);
			const mapMessages: Map<Message['id'], Message[]> = new Map<Message['id'], Message[]>();

			messages.forEach((message: Message) => {
				if (mapMessages.has(message.id)) {
					const arrMessages: Message[] = mapMessages.get(message.id) ?? [];
					arrMessages.push(message);
					mapMessages.set(message.id, arrMessages);
				} else {
					mapMessages.set(message.id, [message]);
				}
			});

			return Array.from(mapMessages.entries()).map((item: [Message['id'], Message[]]) => {
				return {
					uuid: item[0],
					youRequest: item[1][0]?.text ?? 'Нет запроса',
					systemResponse: item[1][1]?.text ?? 'Ответ формируется',
				};
			});
		}),
	);

	public constructor(
		private readonly _terminalService: TerminalService,
		private readonly terminalFacade: TerminalFacade,
		private readonly navigationService: NavigationService,
		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
	) {
		super();
	}

	public ngOnInit(): void {
		this.terminalFacade.clear();
		this.initForm();
		this.setSubscriptions();
	}

	public onClose(): void {
		this._terminalService.setOpenTerminal(false);
	}

	public onEnter(): void {
		if (this.form.valid) {
			const control: FormControl = this.getItem(FormModelTerminal.command);
			this.terminalFacade.sendCommand(control.value);
			control.reset();
		}
	}

	private initForm(): void {
		this.form = TerminalForm.newForm();
	}

	/** Устанаваливаем подписки */
	private setSubscriptions(): void {
		this.terminalFacade.messageFailure$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Не удалось выполнить команду',
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
