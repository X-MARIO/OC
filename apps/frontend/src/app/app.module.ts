import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RootStoreDevelopmentModule, RootStoreModule } from '@oc/frontend/ngxs/store/root';
import { TuiAlertModule, TuiRootModule } from '@taiga-ui/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppCoreModule } from './core/app-core.module';
import { AppRoutingModule } from './routing/app-routing.module';

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
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
