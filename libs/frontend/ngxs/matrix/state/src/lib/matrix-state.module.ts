import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MatrixApiModule } from 'matrix-api';
import { MatrixFacade } from 'matrix-facade';
import { NgxsMatrixFacade } from './matrix.facade';
import { MatrixState } from './matrix.state';

/**
 * Ngxs feature store for auth entities.
 */
@NgModule({
	imports: [MatrixApiModule, NgxsModule.forFeature([MatrixState])],
	providers: [
		{
			provide: MatrixFacade,
			useClass: NgxsMatrixFacade,
		},
	],
})
export class MatrixStateModule {}
