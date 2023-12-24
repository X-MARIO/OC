import { NgxsTerminalFacade } from './terminal.facade';
import { TerminalState } from './terminal.state';

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { TerminalApiModule } from 'terminal-api';
import { TerminalFacade } from 'terminal-facade';

/**
 * Ngxs feature store for auth entities.
 */
@NgModule({
	imports: [TerminalApiModule, NgxsModule.forFeature([TerminalState])],
	providers: [
		{
			provide: TerminalFacade,
			useClass: NgxsTerminalFacade,
		},
	],
})
export class TerminalStateModule {}
