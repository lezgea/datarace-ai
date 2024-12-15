export interface ICategory {
    id: number;
    titles: {
        en: string,
        az: string,
    };
    competitionsCount: number;
    color: string,
    children: ICategory[];
}

export type CategoriesResponse = ICategory[];
