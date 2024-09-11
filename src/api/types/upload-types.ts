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

export interface IDownloadResultRequest {
    resultFieldId: number,
}

export type DownloadResultResponse = Blob;

export interface IProfileImageUploadRequest {
    file: FormData,
}

export interface ISubmitResultRequest {
    competitionId: number,
}
