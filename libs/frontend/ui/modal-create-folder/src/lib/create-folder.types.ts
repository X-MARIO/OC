export enum FormModelCreateItem {
	itemName = 'itemName',
}

export interface IFormModelCreateItem {
	readonly [FormModelCreateItem.itemName]: string;
}
