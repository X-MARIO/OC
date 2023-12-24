import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-terminal-facade-terminal-facade',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './terminal-facade.component.html',
	styleUrl: './terminal-facade.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalFacadeComponent {}
