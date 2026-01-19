export type Page<T> = {
    content: T[];
    sortCol: string;
    ascending: boolean;
    pageSize: number;
    pageNum: number;
}