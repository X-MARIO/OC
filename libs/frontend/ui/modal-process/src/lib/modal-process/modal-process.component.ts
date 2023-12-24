import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import type { Flavor } from '@oc/core/types';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButtonModule } from '@taiga-ui/core';

export type IProcessUser = Flavor<string, 'IProcess-user'>;
export type IProcessPid = Flavor<number, 'IProcess-pid'>;
export type IProcessCpuUsage = Flavor<number, 'IProcess-cpuUsage'>;
export type IProcessMemoryUsage = Flavor<number, 'IProcess-memoryUsage'>;
export type IProcessVsz = Flavor<number, 'IProcess-vsz'>;
export type IProcessRss = Flavor<number, 'IProcess-rss'>;
export type IProcessTty = Flavor<string, 'IProcess-tty'>;
export type IProcessStat = Flavor<string, 'IProcess-stat'>;
export type IProcessStart = Flavor<string, 'IProcess-start'>;
export type IProcessTime = Flavor<string, 'IProcess-time'>;
export type IProcessCommand = Flavor<string, 'IProcess-command'>;

export interface IProcess {
	readonly user: IProcessUser;
	readonly pid: IProcessPid;
	readonly cpuUsage: IProcessCpuUsage;
	readonly memoryUsage: IProcessMemoryUsage;
	readonly vsz: IProcessVsz;
	readonly rss: IProcessRss;
	readonly tty: IProcessTty;
	readonly stat: IProcessStat;
	readonly start: IProcessStart;
	readonly time: IProcessTime;
	readonly command: IProcessCommand;
}

export class Process implements IProcess {
	readonly #user: IProcess['user'] = '';

	readonly #pid: IProcess['pid'] = -1;

	readonly #cpuUsage: IProcess['cpuUsage'] = -1;

	readonly #memoryUsage: IProcess['memoryUsage'] = -1;

	readonly #vsz: IProcess['vsz'] = -1;

	readonly #rss: IProcess['rss'] = -1;

	readonly #tty: IProcess['tty'] = '';

	readonly #stat: IProcess['stat'] = '';

	readonly #start: IProcess['start'] = '';

	readonly #time: IProcess['time'] = '';

	readonly #command: IProcess['command'] = '';

	public get user(): IProcess['user'] {
		return this.#user;
	}

	public get pid(): IProcess['pid'] {
		return this.#pid;
	}

	public get cpuUsage(): IProcess['cpuUsage'] {
		return this.#cpuUsage;
	}

	public get memoryUsage(): IProcess['memoryUsage'] {
		return this.#memoryUsage;
	}

	public get vsz(): IProcess['vsz'] {
		return this.#vsz;
	}

	public get rss(): IProcess['rss'] {
		return this.#rss;
	}

	public get tty(): IProcess['tty'] {
		return this.#tty;
	}

	public get stat(): IProcess['stat'] {
		return this.#stat;
	}

	public get start(): IProcess['start'] {
		return this.#start;
	}

	public get time(): IProcess['time'] {
		return this.#time;
	}

	public get command(): IProcess['command'] {
		return this.#command;
	}
}

@Component({
	selector: 'lib-modal-process',
	standalone: true,
	imports: [CommonModule, TuiButtonModule],
	templateUrl: './modal-process.component.html',
	styleUrls: ['./modal-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalProcessComponent implements OnInit, OnDestroy {
	public constructor(
		private readonly navigationService: NavigationService,
		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
	) {}

	public ngOnDestroy(): void {
		throw new Error('Method not implemented.');
	}

	public ngOnInit(): void {
		throw new Error('Method not implemented.');
	}
}
