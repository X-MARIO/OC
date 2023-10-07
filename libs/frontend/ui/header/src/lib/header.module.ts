import { HeaderComponent } from './header.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
})
export class HeaderModule {}
