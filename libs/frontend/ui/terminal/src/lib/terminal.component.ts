import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-terminal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './terminal.component.html',
	styleUrls: ['./terminal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalComponent {}
