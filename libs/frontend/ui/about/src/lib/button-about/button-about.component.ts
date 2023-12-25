import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
	selector: 'oc-button-about-button-about',
	standalone: true,
	imports: [CommonModule, TuiButtonModule],
	templateUrl: './button-about.component.html',
	styleUrl: './button-about.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAboutComponent {
	public constructor(private readonly navigationService: NavigationService) {}

	public onOpenAbout(): void {
		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().about)
			.then()
			.catch();
	}
}
