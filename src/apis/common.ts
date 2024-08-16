// Pageable interface
export interface Pageable {
    page: number;
    size: number;
    sort?: string | string[] | Sort;
}

// Sort interface (used in Pageable)
export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

// Page interface (represents a page of WebtoonDto objects)
export interface Page<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}