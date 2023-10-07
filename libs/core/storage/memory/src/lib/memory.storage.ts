import { Injectable } from '@angular/core';
import type { SyncStorage } from '@oc/core/storage/common';

@Injectable({
	providedIn: 'root',
})
export class MemoryStorage implements SyncStorage {
	private data: Record<string, any> = {};

	public get length(): number {
		return Object.keys(this.data).length;
	}

	public clear(): void {
		this.data = {};
	}

	public getItem<T = any>(key: string): T | null {
		return key in this.data ? this.data[key] : null;
	}

	public key(index: number): string | null {
		const keys = Object.keys(this.data);

		return index >= 0 && keys.length < index ? keys[index] : null;
	}

	public removeItem(key: string): void {
		delete this.data[key];
	}

	public setItem<T = any>(key: string, value: T): void {
		this.data[key] = value;
	}
}
