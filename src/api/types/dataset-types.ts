export interface IDataset {
    id: number | string,
    title: string,
    description: string,
    imageId?: number,
    imageUrl?: string | null,
    visibility?: string,
    isEditable?: boolean,
    datasetFileDownloadDto?: IDatasetFilesDto[],
    tags: { name: string }[],
    userDto: {
        email: string,
        fullName: string,
        id: number,
        phoneNumber: string,
        username: string,
        userImageUrl?: string,
    }
}

export interface IDatasetFilesDto {
    id: number,
    fileName: string,
    fileType: string,
}

export interface IDatasetsRequest {
    data: { page: number, count: number },
}

export interface IDatasetCreateRequest {
    title: string,
    description: string,
    visibility?: string,
    usability?: number,
    datasetImageId?: number | null,
    datasetProfileImageId?: number,
    tags?: { name: string }[],
}


export interface IDatasetsResponse {
    userDatasets: IDataset[],
    hasNextPage: boolean,
    lastPageNumber: boolean,
    totalElements: number,
}


export interface IDatasetInfoRequest {
    id: string | number,
}


export interface IDatasetUpdateRequest {
    dataId: string,
    title: string,
    description: string,
    visibility?: string,
    usability?: number,
    datasetProfileImageId?: number | null,
    datasetFileDownloadDto: number[] | [],
    tags?: { name: string }[],
}



export interface IDatasetComment {
    id: number,
    text: string,
    userId: number,
    datasetId: number,
    isEditable?: true,
    repliedCommentDto: string,
    fullName: string,
    nickname: string,
    userImageUrl: string,
}

export interface IDatasetCreateCommentRequest {
    id: string | number | undefined,
    data: {
        repliedComment?: {
            commentId: number,
        },
        text: string,
    }
}

export interface IDatasetCreateCommentResponse { }


export interface IGetDatasetCommentsRequest {
    id: string | number | undefined,
}

export type IGetDatasetCommentsResponse = IDatasetComment[]

export interface IDeleteDatasetCommentRequest {
    commentId: string | number | undefined,
}

export interface IDatasetUpdateCommentRequest {
    commentId: string | number | undefined,
    data: {
        text: string,
    }
}