import {
	CdkFixedSizeVirtualScroll,
	CdkVirtualForOf,
	CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { TuiComparator } from '@taiga-ui/addon-table';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { tuiIsString, TuiLetModule, tuiPure } from '@taiga-ui/cdk';
import { TuiScrollbarModule } from '@taiga-ui/core';
import type { TProcessKey } from 'types-process';
import { Process } from 'types-process';

@Component({
	selector: 'oc-table-process-table-process',
	standalone: true,
	imports: [
		CommonModule,
		TuiTableModule,
		TuiLetModule,
		TuiScrollbarModule,
		CdkFixedSizeVirtualScroll,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
	],
	templateUrl: './table-process.component.html',
	styleUrls: ['./table-process.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableProcessComponent {
	@Input({
		required: true,
	})
	public process: Process[] = [];

	public readonly columns: TProcessKey[] = [
		'command',
		'cpuUsage',
		'memoryUsage',
		'pid',
		'rss',
		'start',
		'stat',
		'time',
		'tty',
		'user',
		'vsz',
	];

	public readonly sorterByCommand: TuiComparator<Process> = (a: Process, b: Process): number => {
		const x: Process['command'] = a.command;
		const y: Process['command'] = b.command;
		if (x === y) {
			return 0;
		}

		if (tuiIsString(x) && tuiIsString(y)) {
			return x.localeCompare(y);
		}

		return x > y ? 1 : -1;
	};

	public readonly sorterByStart: TuiComparator<Process> = (a: Process, b: Process): number => {
		const x: Process['start'] = a.start;
		const y: Process['start'] = b.start;
		if (x === y) {
			return 0;
		}

		if (tuiIsString(x) && tuiIsString(y)) {
			return x.localeCompare(y);
		}

		return x > y ? 1 : -1;
	};

	public readonly sorterByStat: TuiComparator<Process> = (a: Process, b: Process): number => {
		const x: Process['stat'] = a.stat;
		const y: Process['stat'] = b.stat;
		if (x === y) {
			return 0;
		}

		if (tuiIsString(x) && tuiIsString(y)) {
			return x.localeCompare(y);
		}

		return x > y ? 1 : -1;
	};

	public readonly sorterByTime: TuiComparator<Process> = (a: Process, b: Process): number => {
		const x: Process['time'] = a.time;
		const y: Process['time'] = b.time;
		if (x === y) {
			return 0;
		}

		if (tuiIsString(x) && tuiIsString(y)) {
			return x.localeCompare(y);
		}

		return x > y ? 1 : -1;
	};

	public readonly sorterByTty: TuiComparator<Process> = (a: Process, b: Process): number => {
		const x: Process['tty'] = a.tty;
		const y: Process['tty'] = b.tty;
		if (x === y) {
			return 0;
		}

		if (tuiIsString(x) && tuiIsString(y)) {
			return x.localeCompare(y);
		}

		return x > y ? 1 : -1;
	};

	public readonly sorterByUser: TuiComparator<Process> = (a: Process, b: Process): number => {
		const x: Process['user'] = a.user;
		const y: Process['user'] = b.user;
		if (x === y) {
			return 0;
		}

		if (tuiIsString(x) && tuiIsString(y)) {
			return x.localeCompare(y);
		}

		return x > y ? 1 : -1;
	};

	@tuiPure
	public getProcessCommand(process: Process): Process['command'] {
		return process.command ?? '-';
	}

	@tuiPure
	public getProcessCpuUsage(process: Process): Process['cpuUsage'] {
		return process.cpuUsage ?? -1;
	}

	@tuiPure
	public getProcessMemoryUsage(process: Process): Process['memoryUsage'] {
		return process.memoryUsage ?? -1;
	}

	@tuiPure
	public getProcessPid(process: Process): Process['pid'] {
		return process.pid ?? -1;
	}

	@tuiPure
	public getProcessRss(process: Process): Process['rss'] {
		return process.rss ?? -1;
	}

	@tuiPure
	public getProcessStart(process: Process): Process['start'] {
		return process.start ?? '-';
	}

	@tuiPure
	public getProcessStat(process: Process): Process['stat'] {
		return process.stat ?? '-';
	}

	@tuiPure
	public getProcessTime(process: Process): Process['time'] {
		return process.time ?? '-';
	}

	@tuiPure
	public getProcessTty(process: Process): Process['tty'] {
		return process.tty ?? '-';
	}

	@tuiPure
	public getProcessUser(process: Process): Process['user'] {
		return process.user ?? '-';
	}

	@tuiPure
	public getProcessVsz(process: Process): Process['vsz'] {
		return process.vsz ?? -1;
	}
}
