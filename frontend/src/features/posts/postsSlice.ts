import type {IPosts} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {getAllPosts} from "./postsThunk.ts";

interface PostState {
    posts: IPosts[];
    loading: boolean;
}

const initialState: PostState  = {
    posts: [],
    loading: false,
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
    }
});


export const postsReducer = postsSlice.reducer;