import type {IPosts} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {addPost, getAllPosts, getPostById} from "./postsThunk.ts";

interface PostState {
    posts: IPosts[];
    loading: boolean;
    onePost: IPosts | null;
}

const initialState: PostState  = {
    posts: [],
    loading: false,
    onePost: null,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllPosts.fulfilled, (state,{payload: posts}) => {
            state.loading = false;
            state.posts = posts;
        });
        builder.addCase(getAllPosts.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getPostById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPostById.fulfilled, (state,{payload: post}) => {
            state.loading = false;
            state.onePost = post;
        });
        builder.addCase(getPostById.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(addPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addPost.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(addPost.rejected, (state) => {
            state.loading = false;
        });
    }
});


export const postsReducer = postsSlice.reducer;