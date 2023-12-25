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

	public constructor(public readonly payload: MatrixElement[][]) {}
}

export class GetMatrixFailure {
	public static readonly type = '[Matrix] Get Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class SetMatrix {
	public static readonly type = '[Matrix] Set';

	public constructor(public readonly payload: MatrixElement[][]) {}
}

export class SetMatrixSuccess {
	public static readonly type = '[Matrix] Set Success';

	public constructor(public readonly payload: MatrixElement[][]) {}
}

export class SetMatrixFailure {
	public static readonly type = '[Matrix] Set Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class CreateElMatrix {
	public static readonly type = '[Matrix] Create One';

	public constructor(public readonly payload: MatrixElement) {}
}

export class CreateElMatrixSuccess {
	public static readonly type = '[Matrix] Create One Success';

	public constructor(public readonly payload: MatrixElement) {}
}

export class CreateElMatrixFailure {
	public static readonly type = '[Matrix] Create One Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class UpdateElMatrix {
	public static readonly type = '[Matrix] Update One';

	public constructor(public readonly payload: MatrixElement) {}
}

export class UpdateElMatrixSuccess {
	public static readonly type = '[Matrix] Update One Success';

	public constructor(public readonly payload: MatrixElement) {}
}

export class UpdateElMatrixFailure {
	public static readonly type = '[Matrix] Update One Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class DeleteElMatrix {
	public static readonly type = '[Matrix] Delete One';

	public constructor(public readonly payload: MatrixElement['_placeId']) {}
}

export class DeleteElMatrixSuccess {
	public static readonly type = '[Matrix] Delete One Success';

	public constructor(public readonly payload: MatrixElement['_placeId']) {}
}

export class DeleteElMatrixFailure {
	public static readonly type = '[Matrix] Delete One Failure';

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
