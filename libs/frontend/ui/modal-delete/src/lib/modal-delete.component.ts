import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'lib-modal-delete',
	templateUrl: './modal-delete.component.html',
	styleUrls: ['./modal-delete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComponent {}
