import { type ITerminalCommand, Message } from 'types-terminal';

export class Init {
	public static readonly type = '[Terminal] Init';
}

export class GetTerminal {
	public static readonly type = '[Terminal] Get';

	public constructor(public readonly payload: ITerminalCommand) {}
}

export class GetTerminalSuccess {
	public static readonly type = '[Terminal] Get Success';

	public constructor(public readonly payload: Message['text']) {}
}

export class GetTerminalFailure {
	public static readonly type = '[Terminal] Get Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class Clear {
	public static readonly type = '[Terminal] Clear';
}

export class ClearSuccess {
	public static readonly type = '[Terminal] Clear Success';
}

export class ClearFailure {
	public static readonly type = '[Terminal] Clear Failure';

	public constructor(public readonly error: Record<string, any>) {}
}
