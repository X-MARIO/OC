import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-modal-about-modal-about',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './modal-about.component.html',
	styleUrl: './modal-about.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAboutComponent {}
