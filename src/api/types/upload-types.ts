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

export interface IResultUploadRequest {
    competitionId: number | undefined;
    file: FormData;
}

export interface IProfileImageUploadRequest {
    file: FormData;
}