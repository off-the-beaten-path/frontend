export class EasyPagination <T> {
    constructor(
	public data: T[],
	public pageNumber: number,
	public lastPage: boolean
    ) {}
}
