import { MatrixElement } from 'types-matrix';

export class Init {
	public static readonly type = '[Matrix] Init';
}

export class GetMatrix {
	public static readonly type = '[Matrix] Get';

	public constructor() {}
}

export class GetMatrixSuccess {
	public static readonly type = '[Matrix] Get Success';

	public constructor(public readonly payload: MatrixElement[]) {}
}

export class GetMatrixFailure {
	public static readonly type = '[Matrix] Get Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class Clear {
	public static readonly type = '[Matrix] Clear';
}

export class ClearSuccess {
	public static readonly type = '[Matrix] Clear Success';
}

export class ClearFailure {
	public static readonly type = '[Matrix] Clear Failure';

	public constructor(public readonly error: Record<string, any>) {}
}
