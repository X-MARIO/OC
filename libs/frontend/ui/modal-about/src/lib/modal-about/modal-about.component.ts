import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'oc-modal-about-modal-about',
	templateUrl: './modal-about.component.html',
	styleUrl: './modal-about.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAboutComponent {
	index = 0;

	readonly items = [
		'angular.svg',
		'avatar.jpg',
		'angular.svg',
		'avatar.jpg',
		'angular.svg',
		'avatar.jpg',
	];
}
