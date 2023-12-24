import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-types-terminal-types-terminal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './types-terminal.component.html',
	styleUrl: './types-terminal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesTerminalComponent {}
