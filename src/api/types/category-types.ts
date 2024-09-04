export interface ICategory {
    id: number;
    name: string;
    competitionsCount: number;
    children: ICategory[];
}

export type CategoriesResponse = ICategory[];
