import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lib-modal-process',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './modal-process.component.html',
	styleUrls: ['./modal-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalProcessComponent {}
