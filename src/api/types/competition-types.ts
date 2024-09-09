export interface ICompetitionsRequest {
    categoryId: number;
    data: { page: number, count: number },
}

export interface ICompetitionInfoRequest {
    id: string | number,
}

export interface ICompetition {
    id: number,
    name: string,
    text: string,
    awardAmount: number,
    imageUrl: string | null,
    lifeTimeDays: number,
}

export interface ICompetitionsResponse {
    competitions: ICompetition[],
    hasNextPage: boolean,
    totalCount: number,
}