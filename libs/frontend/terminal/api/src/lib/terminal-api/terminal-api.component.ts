import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-terminal-api-terminal-api',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './terminal-api.component.html',
	styleUrl: './terminal-api.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalApiComponent {}
