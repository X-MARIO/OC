import type { Flavor } from '@oc/core/types';

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
