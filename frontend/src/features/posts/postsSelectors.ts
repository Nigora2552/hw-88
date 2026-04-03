import type {RootState} from "../../app/store.ts";

export const selectorPosts = (state: RootState) => state.posts.posts;
export const selectorOnePost = (state: RootState) => state.posts.onePost;
export const selectorLoading = (state: RootState) => state.posts.loading;