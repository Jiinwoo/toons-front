import {useMutation, useQuery} from "@tanstack/react-query";
import {createPostApi, deletePostApi, getPostApi, getPostsApi, updatePostApi} from "../apis/board.ts";
import {queryClient} from "../main.tsx";

export const usePostsQuery = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: getPostsApi
    });
};

export const usePostQuery = (id: number) => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostApi(id)
    });
};

export const useCreatePostMutation = () => {
    return useMutation({
        mutationFn: createPostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            });
        },
    });
};

export const useUpdatePostMutation = () => {
    return useMutation(
        {
            mutationFn: updatePostApi,
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['posts']
                });
                queryClient.invalidateQueries({
                    queryKey: ['post', data]
                });
            }
        },
    );
};

export const useDeletePostMutation = () => {
    return useMutation({
        mutationFn: deletePostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            });
        }
    },);
};