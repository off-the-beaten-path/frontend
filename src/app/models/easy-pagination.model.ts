export interface EasyPagination<T> {
  items: T[];
  page: number;
  has_next: boolean;
}
