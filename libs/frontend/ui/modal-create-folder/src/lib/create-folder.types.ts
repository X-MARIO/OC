export enum FormModelCreateFolder {
	folderName = 'folderName',
}

export interface IFormModelCreateFolder {
	readonly [FormModelCreateFolder.folderName]: string;
}
