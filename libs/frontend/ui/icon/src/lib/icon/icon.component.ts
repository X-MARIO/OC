import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
	selector: 'oc-icon',
	standalone: true,
	imports: [CommonModule, TuiButtonModule],
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	public onClick($event: MouseEvent): void {
		console.log($event);
	}
}
