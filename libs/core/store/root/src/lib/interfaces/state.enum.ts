export enum State {
	PENDING = 'PENDING',
	READY = 'READY',
	ERROR = 'ERROR',
	EMPTY = 'EMPTY',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface WithState<D, Error> {
	state: State;
	data: D;
	error: Error;
}
