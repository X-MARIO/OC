import { Observable } from 'rxjs';
import { TerminalService } from './terminal.service';

import { CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiTextareaModule } from '@taiga-ui/kit';

export interface ICommand {
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
	],
	templateUrl: './terminal.component.html',
	styleUrls: ['./terminal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalComponent {
	public open$: Observable<boolean> = this._terminalService.getOpenTerminal$();

	public commands: ICommand[] = [
		{
			youRequest: 'ls',
			systemResponse: 'response 1',
		},
		{
			youRequest: 'cd',
			systemResponse: 'response 2',
		},
		{
			youRequest: 'mkdir',
			systemResponse: 'response 3',
		},
	];

	public constructor(private readonly _terminalService: TerminalService) {}

	public onClose(): void {
		this._terminalService.setOpenTerminal(false);
	}

	public onEnter(): void {
		this.onClose();
	}
}
