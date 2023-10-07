import { NavigationExternalPathPipe } from './navigation-external-path.pipe';
import { NavigationPathPipe } from './navigation-path.pipe';

import { NgModule } from '@angular/core';

const pipes = [NavigationPathPipe, NavigationExternalPathPipe];

@NgModule({
	declarations: [...pipes],
	exports: [...pipes],
})
export class NavigationSharedModule {}
