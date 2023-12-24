import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TerminalService {
	/** Событие: Открытие и скрытие терминала  */
	private readonly onOpenTerminal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false,
	);

	/*
	 * Подписка на событие: Получить пациента
	 * */
	public getOpenTerminal$(): Observable<boolean> {
		return this.onOpenTerminal$.asObservable();
	}

	/**
	 * Вызов события: Установить состояние терминала
	 * @param value
	 */
	public setOpenTerminal(value: boolean): void {
		this.onOpenTerminal$.next(value);
	}
}
