import type {RootState} from "../../app/store.ts";

export const selectorPosts = (state: RootState) => state.posts.posts;
export const selectorLoading = (state: RootState) => state.posts.loading;