import type { Flavor } from '@oc/core/types';

export enum EAuthor {
	SYSTEM = 'SYSTEM',
	USER = 'USER',
}

export type IMessageId = Flavor<string, 'IMessage-id'>;
export type IMessageText = Flavor<string, 'IMessage-text'>;
export type IMessageAuthor = Flavor<EAuthor, 'IMessage-author'>;
export type IMessageCreatedAt = Flavor<number, 'IMessage-createdAt'>;

export interface IMessage {
	readonly id: IMessageId;
	readonly text: IMessageText;
	readonly author: IMessageAuthor;
	readonly createdAt: IMessageCreatedAt;
}

export class Message implements IMessage {
	public readonly id: IMessage['id'] = '';

	public readonly text: IMessage['text'] = '';

	public readonly author: IMessage['author'] = EAuthor.SYSTEM;

	public readonly createdAt: IMessage['createdAt'] = -1;

	public constructor(params: IMessage) {
		this.update(params);
	}

	private update(params: Partial<IMessage>): this {
		return Object.assign(this, params);
	}
}

// пока не вижу необходимости создавать class Terminal содержащий массив сообщений
