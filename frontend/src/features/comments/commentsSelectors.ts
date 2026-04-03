import type {RootState} from "../../app/store.ts";

export const selectorComments = (state: RootState) => state.comment.comments;
