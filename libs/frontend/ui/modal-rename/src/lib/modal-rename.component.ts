import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'lib-modal-rename',
	templateUrl: './modal-rename.component.html',
	styleUrls: ['./modal-rename.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalRenameComponent {}
