import { environment } from '../../environments/environment';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ENVIRONMENTS } from '@oc/core/environments/service';
import { PATHS } from '@oc/core/navigation/common';
import { ApiAuthInterceptorModule } from '@oc/frontend/auth/api/interceptors/auth-interceptor';
import { AuthGuardsModule } from '@oc/frontend/auth/guards';
import { REDUX_TYPE } from '@oc/frontend/config';
import { AuthStateModule } from '@oc/frontend/ngxs/auth/state';
import { LayoutModule } from '@oc/ui/layout';

registerLocaleData(localeRu);

@NgModule({
	imports: [
		LayoutModule,

		// interceptors
		ApiAuthInterceptorModule,

		// Auth module use in many modules
		AuthStateModule,
		AuthGuardsModule,
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
			useValue: PATHS,
		},
	],
})
export class AppCoreModule {}
