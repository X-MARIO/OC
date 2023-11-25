import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	standalone: true,
	selector: 'lib-modal-delete',
	templateUrl: './modal-delete.component.html',
	styleUrls: ['./modal-delete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComponent {}
