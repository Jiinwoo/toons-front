import axiosInstance from "./config.ts";
import {Page} from "./common.ts";

export interface PostDto {
    id: number;
    title: string;
    content: string;
    username: string;
    tag?: string;
    isLiked: boolean | null;
    createdAt: string;
    updatedAt: string;
}

export interface PostCreateDto {
    title: string;
    content: string;
    contentType: string;
    contentId?: number;
}

export interface PostUpdateDto {
    title: string;
    content: string;
    contentType: ContentType;
    contentId?: number;
}

export const ContentTypeObject = {
    GENERAL: "GENERAL",
    WEBTOON: "WEBTOON",
    WEBNOVEL: "WEBNOVEL",
} as const;


export type ContentType = typeof ContentTypeObject[keyof typeof ContentTypeObject]

export const getPostsApi = async () => {
    const response = await axiosInstance.get<Page<PostDto>>('/api/posts', {
        params: {
            "boardId": "1"
        }
    });
    return response.data;
};

export const getPostApi = async (id: number) => {
    const response = await axiosInstance.get<PostDto>(`/api/posts/${id}`);
    return response.data;
};

export const createPostApi = async (post: PostCreateDto) => {
    const response = await axiosInstance.post<number>('/api/posts', post, {
        params: {
            "boardId": "1"
        }
    });
    return response.data;
};

export const updatePostApi = async ({id, post}: { id: number, post: PostUpdateDto }) => {
    const response = await axiosInstance.put<number>(`/api/posts/${id}`, post);
    return response.data;
};

export const deletePostApi = async (id: number) => {
    await axiosInstance.delete(`/api/posts/${id}`);
};

export const likePostApi = async (id: number) => {
    await axiosInstance.post(`/api/posts/${id}/like`);
}

export const unlikePostApi = async (id: number) => {
    await axiosInstance.delete(`/api/posts/${id}/like`);
}