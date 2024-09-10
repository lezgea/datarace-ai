export interface IMessageResponse {
    error?: string,
    success?: string,
    message?: string,
    data?: {
        success?: string,
        error?: string,
        message?: string,
    }
}

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
    joinAvailable: boolean,
    uploadAvailable: boolean,
}

export interface ICompetitionsResponse {
    competitions: ICompetition[],
    hasNextPage: boolean,
    totalCount: number,
}