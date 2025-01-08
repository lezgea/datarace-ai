
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
    userDto: {
        id: number,
        email: string,
        fullName: string,
        username: string,
        phoneNumber: string,
        userImageUrl: string,
    },
    title: string,
    content: string,
    isEditable: boolean,
    isPending: boolean,
    status: string,
    imageId: number,
    imageUrl: string,
    createdAt: string,
    fullName: string,
    userImageUrl: string,
    tags: ITag[],
}


export interface IBlogListRequest {
    data: {
        page: number,
        count: number,
        blogCriteria?: {
            content?: string,
            isMyBlog: boolean,
        }
    }
}

export interface IBlogListResponse {
    userDatasets: IBlogItem[],
    hasNext: boolean,
    lastPageNumber: number,
    totalElements: number,
}


export interface IBlogInfoRequest {
    id: number | string,
}

export interface IBlogInfoResponse extends IBlogItem {
    status: string,
}


export interface IBlogUpdateRequest {
    id: string,
    title: string,
    content: string,
    blogProfileImageId: number | string | null,
    tags: ITag[],
}

export interface IRelatedBlogListRequest {
    id: number | string | null,
    data: {
        page: number,
        count: number,
        blogCriteria?: {
            content?: string,
            isMyBlog: boolean,
        }
    }
}


export type IRelatedBlogListResponse = IBlogItem[];