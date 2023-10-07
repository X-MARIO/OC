import { InjectionToken } from '@angular/core';

export const REDUX_TYPE = new InjectionToken<string>('REDUX_TYPE');

export const PATH_REMOTE = new InjectionToken<string>('PATH_REMOTE');

export const NAVIGATION_PATHS = new InjectionToken<Record<string, any>>('NAVIGATION_PATHS');
