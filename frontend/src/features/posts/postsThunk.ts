import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IPosts, PostMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import type { RootState} from "../../app/store.ts";
export const getAllPosts = createAsyncThunk<IPosts[], void>(
    'posts/getAllPosts',
    async () => {
        const response = await axiosApi.get<IPosts[]>('/posts');
        return response.data || [];
    }
);

export const getPostById = createAsyncThunk<IPosts, string>(
    'posts/getPostById',
    async (id) => {
        const response = await axiosApi.get<IPosts>(`/posts/${id}`);
        return response.data || null;
    }
);


export const addPost = createAsyncThunk<void, PostMutation, { state: RootState }>('message/addPost',
    async (item, {getState}) => {
        const formData = new FormData();

        const keys = Object.keys(item) as (keyof PostMutation)[];

        keys.forEach(key => {
            const value = item[key];
            if (value !== null) {
                formData.append(key, value as string)
            }
        });

        const token = getState().users.user?.token;
        await axiosApi.post('/posts', formData, {headers: {'Authorization': 'Bearer ' + token}});
    })