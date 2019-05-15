export interface IEasyPagination<T> {
  items: T[];
  page: number;
  has_next: boolean;
}
