
export interface ITag {
    id?: number | string | null,
    name: string,
}

export interface IBlog {
    id: number | string | null,
    title: string,
    content: string,
    imageUrl: string,
    imageId: number | string | null,
    isEditable: boolean,
    createdAt: string,
    tags: ITag[],
}


export interface IBlogCreateRequest {
    blogImageId: number | string | null,
    title: string,
    content: string,
    tags: ITag[],
}

export interface IBlogCreateResponse {
    data: IBlog,
    description: string,
    status: string,
    title: string,
}



export interface IBlogItem {
    id: number | string | null,
    cover: {
        id: number,
        name: string,
        url: string,
        mime_type: string,
        size: number,
        created_at: string,
        type: string,
    },
    title: string,
    content: string,
    description: string,
    content_short: string,
    read_time: number,
    active: number,
    creator: {
        id: number,
        name: string
    },
    category: boolean,
    created_at: string
}


export interface IBlogListRequest {
    skip: number,
    limit: number,
}

export interface IBlogListResponse {
    data: IBlogItem[],
    status: string,
    count: number,
    skip: number,
    limit: number,
}


export interface IBlogInfoRequest {
    id: number | string,
}

export interface IBlogInfoResponse {
    status: string,
    data: IBlogItem,
}


export interface IBlogUpdateRequest {
    id: string,
    title: string,
    description: string,
    content: string,
    read_time: number,
}