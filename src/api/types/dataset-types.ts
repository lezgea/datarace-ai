export interface IDataset {
    id: number | string,
    title: string,
    description: string,
    imageUrl?: string | null,
    visibility?: string,
    userDto: {
        email: string,
        fullName: string,
        id: number,
        phoneNumber: string,
        username: string,
    }
}

export interface IDatasetsRequest {
    data: { page: number, count: number },
}


export interface IDatasetsResponse {
    userDatasets: IDataset[],
    hasNextPage: boolean,
    lastPageNumber: boolean,
    totalCount: number,
}
