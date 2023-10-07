export interface IPagingResults {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalRecords: number;
}

export interface IPagesPagingResults {
	firstPage: string;
	lastPage: string;
	nextPage: string;
	previousPage: string;
}

export interface IStatusPagingResults {
	succeeded: boolean;
	errors: null;
	messages: null;
}
