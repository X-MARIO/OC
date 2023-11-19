import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '@oc/frontend/auth/facade';
import { TuiDay } from '@taiga-ui/cdk';
import type { TuiSizeL, TuiSizeS } from '@taiga-ui/core';

class Language {
	public constructor(public readonly name: string) {}
}

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
	public dropdownOpen = false;

	public readonly size: TuiSizeL | TuiSizeS = 'm';

	public readonly dayForm = new FormGroup({
		day: new FormControl(new TuiDay(2017, 0, 15)),
	});

	public languages: Language[] = [new Language('RU'), new Language('EN')];

	public readonly languageForm = new FormGroup({
		language: new FormControl(this.languages[0]),
	});

	public readonly logged$: AuthFacade['logged$'] = this.authFacade.logged$;

	public constructor(private readonly authFacade: AuthFacade, private readonly router: Router) {}

	public ngOnInit(): void {}

	public navigate(): void {
		// void this.router.navigate('').then().catch();
	}
}
