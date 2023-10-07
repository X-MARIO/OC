export interface ITreeNode {
	children?: readonly ITreeNode[];
	text: string;
	id: number;
}
