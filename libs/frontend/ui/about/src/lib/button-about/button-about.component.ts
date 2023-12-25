import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-button-about-button-about',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './button-about.component.html',
	styleUrl: './button-about.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAboutComponent {}
