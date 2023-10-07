import { ReplaySubject } from 'rxjs';

import { AuthGuard } from './auth.guard';

import { TestBed, waitForAsync } from '@angular/core/testing';
import type { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NAVIGATION_PATHS, PATHS_STUB } from '@banx/core/navigation/common';
import { NavigationService } from '@banx/core/navigation/service';
import { SessionAsyncStorage } from '@banx/core/storage/session';
import { providerOf } from '@banx/core/testing';
import { UserStorageKeys } from '@banx/users/common';
import { readFirst } from '@nrwl/angular/testing';
import { mock, when } from 'ts-mockito';

describe('authGuard', () => {
	let guard: AuthGuard;
	let sessionAsyncStorageMock: SessionAsyncStorage;
	let navigationServiceMock: NavigationService;
	let authToken$: ReplaySubject<string | null>;

	const URL_TREE_STUB = {} as UrlTree;

	beforeEach(() => {
		navigationServiceMock = mock(NavigationService);
		sessionAsyncStorageMock = mock(SessionAsyncStorage);

		authToken$ = new ReplaySubject<string | null>(1);
	});

	beforeEach(waitForAsync(() => {
		void TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [
				AuthGuard,
				providerOf(SessionAsyncStorage, sessionAsyncStorageMock),
				providerOf(NavigationService, navigationServiceMock),
				PATHS_STUB,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		when(sessionAsyncStorageMock.getItem(StorageKeys.AuthToken)).thenReturn(authToken$);
		when(navigationServiceMock.createUrlTree(NAVIGATION_PATHS.user)).thenReturn(URL_TREE_STUB);

		guard = TestBed.inject(AuthGuard);
	});

	it('should create an instance', () => {
		expect(guard).toBeTruthy();
	});

	it('canActivate() should return true', async () => {
		authToken$.next('absrds');
		const result = await readFirst(guard.canActivate());

		expect(result).toEqual(URL_TREE_STUB);
	});

	it('canActivate() should redirect to home page', async () => {
		authToken$.next(null);
		const result = await readFirst(guard.canActivate());

		expect(result).toBeTruthy();
	});
});
