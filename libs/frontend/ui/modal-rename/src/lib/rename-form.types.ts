export enum FormModelRename {
	fileName = 'fileName',
}

export interface IFormModelRename {
	readonly [FormModelRename.fileName]: string;
}
