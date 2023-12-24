import { NgxsProcessFacade } from './process.facade';
import { ProcessState } from './process.state';

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ProcessApiModule } from 'process-api';
import { ProcessFacade } from 'process-facade';

/**
 * Ngxs feature store for auth entities.
 */
@NgModule({
	imports: [ProcessApiModule, NgxsModule.forFeature([ProcessState])],
	providers: [
		{
			provide: ProcessFacade,
			useClass: NgxsProcessFacade,
		},
	],
})
export class ProcessStateModule {}
