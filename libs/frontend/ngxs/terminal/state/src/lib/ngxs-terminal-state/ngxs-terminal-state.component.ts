import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-ngxs-terminal-state-ngxs-terminal-state',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ngxs-terminal-state.component.html',
	styleUrl: './ngxs-terminal-state.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxsTerminalStateComponent {}
