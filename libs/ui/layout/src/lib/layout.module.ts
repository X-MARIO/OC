import { LayoutComponent } from './layout.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [LayoutComponent],
	exports: [LayoutComponent],
})
export class LayoutModule {}
