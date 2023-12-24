import type { Process } from 'types-process';

export class Init {
	public static readonly type = '[Process] Init';
}

export class GetProcess {
	public static readonly type = '[Process] Get';
}

export class GetProcessSuccess {
	public static readonly type = '[Process] Get Success';

	public constructor(public readonly payload: Process[]) {}
}

export class GetProcessFailure {
	public static readonly type = '[Process] Get Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class Clear {
	public static readonly type = '[Process] Clear';
}

export class ClearSuccess {
	public static readonly type = '[Process] Clear Success';
}

export class ClearFailure {
	public static readonly type = '[Process] Clear Failure';

	public constructor(public readonly error: Record<string, any>) {}
}
