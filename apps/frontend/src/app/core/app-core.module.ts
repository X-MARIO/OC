import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ENVIRONMENTS } from '@oc/core/environments/service';
import { NAVIGATION_PATHS, PATHS } from '@oc/core/navigation/common';
import { ApiAuthInterceptorModule } from '@oc/frontend/auth/api/interceptors/auth-interceptor';
import { REDUX_TYPE } from '@oc/frontend/config';
import { AuthStateModule } from '@oc/frontend/ngxs/auth/state';
import { HeaderModule } from '@oc/frontend/ui/header';
import { LayoutModule } from '@oc/ui/layout';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { of } from 'rxjs';

import { environment } from '../../environments/environment';

registerLocaleData(localeRu);

@NgModule({
	imports: [
		LayoutModule,
		HeaderModule,

		// interceptors
		ApiAuthInterceptorModule,

		// Auth module use in many modules
		AuthStateModule,
		// AuthGuardsModule,
	],
	providers: [
		{
			provide: REDUX_TYPE,
			useValue: 'NGXS',
		},
		{
			provide: LOCALE_ID,
			useValue: 'ru',
		},
		{
			provide: DEFAULT_CURRENCY_CODE,
			useValue: 'RUB',
		},
		{
			provide: ENVIRONMENTS,
			useValue: environment,
		},
		{
			provide: PATHS,
			useValue: NAVIGATION_PATHS,
		},
		{
			provide: TUI_LANGUAGE,
			// eslint-disable-next-line rxjs/finnish
			useValue: of(TUI_RUSSIAN_LANGUAGE),
		},
	],
})
export class AppCoreModule {}
