class BasePaginationMeta {
  itemCount: number;
  /**
   * the total amount of items
   */
  totalItems: number;
  /**
   * the amount of items that were requested per page
   */
  itemsPerPage: number;
  /**
   * the total amount of pages in this paginator
   */
  totalPages: number;
  /**
   * the current page this paginator "points" to
   */
  currentPage: number;
}

export abstract class PaginationBase<T> {
  items: T[];

  meta: BasePaginationMeta;
}

export class PaginationArgs {
  limit?: number;

  page?: number;
}

export function createPaginationObject<T>(items: T[], totalItems: number, currentPage: number, limit: number) {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    meta: {
      totalItems: totalItems,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages: totalPages,
      currentPage: currentPage,
    },
  };
}
