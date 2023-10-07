export class Chunker {
	/**
	 * Разбивка массива элементов на блоки по размеру блока
	 * @param objects - Массив лементов для разбивки
	 * @param chunkSize - Максимальный размер блока
	 */
	public static bySize<T = unknown>(objects: T[], chunkSize = 30): T[][] {
		const maxChunks: number = Math.ceil(objects.length / chunkSize);
		return Array.from({ length: maxChunks }, (_: unknown, ix: number) =>
			objects.slice(chunkSize * ix, chunkSize * (ix + 1)),
		);
	}

	/**
	 * Разбивка массива на блоки по количеству блоков
	 * @param objects - Массив лементов для разбивки
	 * @param chunksAmount - Количество блоков
	 */
	public static byAmount<T = unknown>(objects: T[], chunksAmount: number): T[][] {
		const chunkSize: number = Math.ceil(objects.length / chunksAmount);
		const chunks: T[][] = [];
		for (let i = 0; i < objects.length; i += chunkSize) {
			chunks.push(objects.slice(i, i + chunkSize));
		}
		while (chunks.length < chunksAmount) {
			chunks.push([]);
		}
		return chunks;
	}
}
