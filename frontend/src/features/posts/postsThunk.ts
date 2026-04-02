import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IPosts} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const getAllPosts = createAsyncThunk<IPosts[], void>(
    'posts/getAllPosts',
    async () => {
        const response = await axiosApi.get<IPosts[]>('/posts');
        return response.data || [];
    }
)