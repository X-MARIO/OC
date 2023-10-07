export class Paginator {
	public static countRemainingPagesAsArray(
		pageSize: number | string,
		total: number | string,
	): number[] {
		return Array.from(Array(Math.ceil(+total / +pageSize)).keys()).slice(1);
	}

	public static getRemainingPagesAsArray(pageTotal: number | string): number[] {
		return Array.from(Array(+pageTotal).keys()).slice(1);
	}

	public static getParamsWithPageIndex<P extends { pageIndex?: number }>(
		params: P,
		pageIndex: number,
	): P {
		return {
			...params,
			...{ pageIndex },
		};
	}

	public static getParamsWithPageSize<P>(params: P, pageSize: number, pageNumber: number): P {
		return {
			...params,
			...{
				pagingOptions: {
					pageNumber,
					pageSize,
				},
			},
		};
	}

	public static getParamsWithPaging<P>(params: P, pageSize: number, pageNumber: number): P {
		return {
			...params,
			...{
				paging: {
					page: pageNumber,
					pageSize,
				},
			},
		};
	}

	public static getParamsWithPagingRequest<P>(
		params: P,
		pageSize: number,
		pageNumber: number,
	): P {
		return {
			...params,
			...{
				pagingRequest: {
					page: pageNumber,
					pageSize,
				},
			},
		};
	}

	public static getParamsWithLimitOffset<P extends { limit?: number; offset?: number }>(
		params: P,
		limit: number,
		offset: number,
	): P {
		return {
			...params,
			limit,
			offset,
		};
	}
}
