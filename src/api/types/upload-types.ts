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

export interface IResultSaveRequest {
    competitionId: number | undefined,
    file: FormData,
}

export interface IGetResultRequest {
    competitionId: number | undefined,
    userId: number,
}

export interface IGetResultResponse {
    id: number,
}

export interface IDataset {
    dataFileId: number,
    fileName: string,
    extension: string,
}

export interface IGetDatasetRequest {
    competitionId: number | undefined,
}

export interface IGetDatasetResponse extends Array<IDataset> { }


export interface IDownloadResultRequest {
    resultFieldId?: number,
    dataFieldId?: number,
}

export type DownloadResultResponse = Blob;

export interface IProfileImageUploadRequest {
    file: FormData,
}

export interface IProfileImageUploadResponse {
    id: number,
}

export interface ISubmitResultRequest {
    competitionId: number,
}

export interface IDatasetFileUploadRequest {
    datasetId: number | string | undefined,
    file: FormData,
}

export interface IBlogFileUploadRequest {
    blogProfileImageId?: number | string | undefined,
    file: FormData,
}
