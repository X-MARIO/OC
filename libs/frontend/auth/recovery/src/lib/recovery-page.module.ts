import { RecoveryPageComponent } from './recovery-page/recovery-page.component';
import { RecoveryPageRoutingModule } from './recovery-page-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [CommonModule, RecoveryPageRoutingModule],
	declarations: [RecoveryPageComponent],
})
export class RecoveryPageModule {}
