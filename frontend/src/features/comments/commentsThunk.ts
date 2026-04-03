import {createAsyncThunk} from "@reduxjs/toolkit";
import type {CommentMutation, IComments} from "../../types";
import axiosApi from "../../axiosApi.ts";
import type {RootState} from "../../app/store.ts";


export const getAllComment = createAsyncThunk<IComments[], void>(
    'comment/getAllComment',
    async () => {
        const response = await axiosApi.get<IComments[]>('/comments');
        return response.data || [];
    }
);

export const addComment = createAsyncThunk<IComments, CommentMutation, { state: RootState }>(
    'comment/addComment',
    async (item, {getState}) => {

        const token = getState().users.user?.token;
        const response = await axiosApi.post<IComments>('/comments', item, {headers: {'Authorization': 'Bearer ' + token}});
        return response.data
    })