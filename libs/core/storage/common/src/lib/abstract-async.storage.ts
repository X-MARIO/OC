import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import type { IAsyncStorage } from './async-storage.interface';

import type { Observable } from 'rxjs';

export const STORAGE_KEY = 'OC_LOCAL_STATE';

export abstract class AbstractAsyncStorage implements IAsyncStorage {
	protected readonly state$!: BehaviorSubject<Record<string, any>>;

	protected key = STORAGE_KEY;

	protected constructor(public readonly storage: Storage) {
		this.state$ = new BehaviorSubject<Record<string, any>>(this.getLocalState());
	}

	public get state(): Record<string, any> {
		return this.state$.getValue();
	}

	public get length(): number {
		return Object.keys(this.state).length;
	}

	public clear(): void {
		this.setState({});
	}

	public getItem<T = any>(key: string): Observable<T | null> {
		return this.state$.pipe(map((state) => state[key] ?? null));
	}

	public getItems<T = any>(keys: string[]): Observable<T> {
		return combineLatest(keys.map((key) => this.getItem(key))) as any;
	}

	public removeItem(key: string): void {
		const state = { ...this.state };
		if (key in state) {
			delete state[key];

			this.setState(state);
		}
	}

	public removeItems(keys: string[]): void {
		const state = { ...this.state };

		for (const key of keys) {
			if (key in state) {
				delete state[key];
			}
		}

		this.setState(state);
	}

	public setItem<T = any>(key: string, value: T): void {
		this.setState({ ...this.state$.getValue(), [key]: value });
	}

	public setItems<T extends Record<string, any> = Record<string, any>>(state: T): void {
		this.setState({ ...this.state$.getValue(), ...state });
	}

	protected setState(state: Record<string, any>): void {
		this.state$.next(state);
		this.setLocalState(state);
	}

	protected setLocalState(state: Record<string, any>): void {
		try {
			this.storage.setItem(this.key, JSON.stringify(state));
		} catch (error) {
			console.error(error);
		}
	}

	protected getLocalState(): Record<string, any> {
		const state: string | null = this.storage.getItem(this.key);

		return state != null ? JSON.parse(state) : {};
	}
}
