import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButtonModule, TuiHostedDropdownModule } from '@taiga-ui/core';

@Component({
	selector: 'lib-button-process',
	standalone: true,
	imports: [CommonModule, TuiButtonModule, TuiHostedDropdownModule],
	templateUrl: './button-process.component.html',
	styleUrls: ['./button-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonProcessComponent {
	public onOpenProcess($event: MouseEvent): void {}
}
