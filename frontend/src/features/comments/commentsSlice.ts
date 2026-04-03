import type {IComments} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {addComment, getAllComment} from "./commentsThunk.ts";

interface CommentState {
    comments: IComments[];
    loading: boolean;
}

const initialState: CommentState  = {
    comments: [],
    loading: false,
}

export const commentsSlice = createSlice({
    name: 'comment',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getAllComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllComment.fulfilled, (state,{payload: comment}) => {
            state.loading = false;
            state.comments = comment;
        });
        builder.addCase(getAllComment.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(addComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comments.push(action.payload);
        });
        builder.addCase(addComment.rejected, (state) => {
            state.loading = false;
        });
    }
});


export const commentsReducer = commentsSlice.reducer;