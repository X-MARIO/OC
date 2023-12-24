import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-button-process',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './button-process.component.html',
	styleUrls: ['./button-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonProcessComponent {}
