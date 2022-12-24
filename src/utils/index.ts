export interface Pagination {
  total: number;
  pageSize: number;
  page: number;
  pages: number;
}

/**
 *
 * @param total
 * @param pageSize
 * @param page
 * @returns
 */
export const getPagination = (
  total: number,
  page: number,
  pageSize: number,
): Pagination => {
  const pages = Math.ceil(total / pageSize);
  return {
    total,
    page,
    pageSize,
    pages,
  };
};

export * from './regex.util';
