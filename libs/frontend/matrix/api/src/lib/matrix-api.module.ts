import { NgModule } from '@angular/core';
import { MatrixApiWrapperService } from './matrix-api-wrapper.service';
import { MatrixApiMockService } from './matrix-api.mock.service';

@NgModule({
	providers: [{
		provide: MatrixApiWrapperService,
		useClass: MatrixApiMockService,
	}],
})
export class MatrixApiModule {}
