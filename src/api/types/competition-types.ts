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

export interface IAttendedCompetitionsRequest {
    data: { page: number, count: number, userHasSubmitted?: boolean },
}

export interface IScoreboardRequest {
    data: { page: number, count: number, competitionId?: string | number },
}

export interface IAttendedCompetition {
    competitionId: number,
    competitionName: string,
    text: string,
    awardAmount: number,
    currencySymbol: string,
    lifeTimeDays: number,
    fullName: string,
    nickname: string,
    phoneNumber: string | number,
    resultFileId: string,
    imageUrl?: string,
}

export interface IScoreboard extends IAttendedCompetition {
    profileImageUrl?: string,
    score?: number,
    rank?: number,
}

export interface IAttendedCompetitionsResponse {
    userCompetitions: IAttendedCompetition[],
    hasNext: boolean,
    lastPageNumber: number,
    totalElements: number,
}

export interface IScoreboardResponse {
    userCompetitions: IScoreboard[],
    hasNext: boolean,
    lastPageNumber: number,
    totalElements: number,
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
    currencySymbol: string,
}

export interface ICompetitionsResponse {
    competitions: ICompetition[],
    hasNextPage: boolean,
    totalCount: number,
}