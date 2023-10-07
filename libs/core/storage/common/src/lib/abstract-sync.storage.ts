import type { SyncStorage } from './sync-storage.interface';

export abstract class AbstractSyncStorage implements SyncStorage {
	protected constructor(public readonly storage: Storage) {}

	public get length(): number {
		return this.storage.length ?? 0;
	}

	public clear(): void {
		this.storage.clear();
	}

	public getItem(key: string): string | null {
		return this.storage.getItem(key) ?? null;
	}

	public key(index: number): string | null {
		return this.storage.key(index) ?? null;
	}

	public removeItem(key: string): void {
		this.storage.removeItem(key);
	}

	public setItem(key: string, value: string): void {
		try {
			this.storage.setItem(key, value);
		} catch (error) {
			console.error(error);
		}
	}
}
