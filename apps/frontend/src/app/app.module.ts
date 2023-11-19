import { environment } from '../environments/environment';
import { AppCoreModule } from './core/app-core.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RootStoreDevelopmentModule, RootStoreModule } from '@oc/frontend/ngxs/store/root';
import {
	TuiAlertModule,
	TuiDialogModule,
	TuiModeModule,
	TuiRootModule,
	TuiThemeNightModule,
} from '@taiga-ui/core';

@NgModule({
	declarations: [AppComponent],
	imports: [
		// @angular
		HttpClientModule,
		BrowserAnimationsModule,

		// pwa
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: !isDevMode(),
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),

		// ssr
		BrowserModule.withServerTransition({ appId: 'serverApp' }),

		// ngxs
		// eslint-disable-next-line
		!environment.production ? RootStoreDevelopmentModule : RootStoreModule,

		// material

		// config
		AppRoutingModule,
		AppCoreModule,
		TuiRootModule,
		TuiAlertModule,
		TuiDialogModule,
		TuiThemeNightModule,
		TuiModeModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			// enabled: !isDevMode(),
			enabled: true,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
