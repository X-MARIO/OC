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

export type TProcessKey =
	| 'command'
	| 'cpuUsage'
	| 'memoryUsage'
	| 'pid'
	| 'rss'
	| 'start'
	| 'stat'
	| 'time'
	| 'tty'
	| 'user'
	| 'vsz';

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
	public readonly user: IProcess['user'] = '';

	public readonly pid: IProcess['pid'] = -1;

	public readonly cpuUsage: IProcess['cpuUsage'] = -1;

	public readonly memoryUsage: IProcess['memoryUsage'] = -1;

	public readonly vsz: IProcess['vsz'] = -1;

	public readonly rss: IProcess['rss'] = -1;

	public readonly tty: IProcess['tty'] = '';

	public readonly stat: IProcess['stat'] = '';

	public readonly start: IProcess['start'] = '';

	public readonly time: IProcess['time'] = '';

	public readonly command: IProcess['command'] = '';

	public constructor(params: IProcess) {
		this.update(params);
	}

	private update(params: Partial<IProcess>): this {
		return Object.assign(this, params);
	}
}
