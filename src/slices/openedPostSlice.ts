import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IComment, IPost } from "../types";
import { fetchComments, fetchPost, IError, leaveComment, removeLike, setLike } from "../util/api";
import { refetchPost } from "./postsSlice";

export interface OpenedPostState {
    post: IPost | null;
    comments: IComment[]
    postStatus: "idle" | "loading" | "failed";
    commentsStatus: "idle" | "loading" | "failed";
}

const initialState: OpenedPostState = {
    post: null,
    comments: [],
    postStatus: "idle",
    commentsStatus: "idle"
}

export const openPost = createAsyncThunk(
    "openedPost/openPost",
    async (post_id: number, thunkAPI) => {
        return fetchPost(post_id).then(json => {
            // load comments after post
            thunkAPI.dispatch(loadComments(json.id));
            return json;
        })
    }
);

export const loadComments = createAsyncThunk(
    "openedPost/loadComments",
    async (post_id: number, thunkAPI) => {
        return fetchComments(post_id);
    }
);

export const leaveOwnComment = createAsyncThunk(
    "openedPost/leaveComment",
    async ({post_id, message}: {post_id: number, message: string}, thunkAPI) => {
        if(!message) return;
        await leaveComment(post_id, message);
        thunkAPI.dispatch(loadComments(post_id));
    }
);

export const likeOpenedPost = createAsyncThunk(
    "openedPost/like",
    async (_, thunkAPI) => {
        const post = selectOpenedPost(thunkAPI.getState() as RootState);
        if(!post) return;
        const post_id = post.id;
        const result = await setLike(post_id);
        if(!(result as IError).error) {
            thunkAPI.dispatch(triggerLike(true));
        }
        thunkAPI.dispatch(refetchPost(post_id));
        return result;
    }
);

export const dislikeOpenedPost = createAsyncThunk(
    "openedPost/dislike",
    async (_, thunkAPI) => {
        const post = selectOpenedPost(thunkAPI.getState() as RootState);
        if(!post) return;
        const post_id = post.id;
        const result = await removeLike(post_id);
        if(!(result as IError).error) {
            thunkAPI.dispatch(triggerLike(false));
        }
        thunkAPI.dispatch(refetchPost(post_id));
    }
);

const openedPostSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        triggerLike(state, action: PayloadAction<boolean>) {
            if(state.post) {
                state.post.is_liked = action.payload;
                state.post.likes_count = state.post.likes_count + (action.payload ? 1 : -1);
            }
        },
        closePost(state) {
            state.post = null;
            state.comments = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(openPost.pending, (state) => {
            state.postStatus = "loading";
            state.post = null;
        }).addCase(openPost.fulfilled, (state, action) => {
            state.postStatus = "idle";
            state.post = action.payload;
        }).addCase(openPost.rejected, (state) => {
            state.postStatus = "failed";
        })
        .addCase(loadComments.pending, (state) => {
            state.commentsStatus = "loading";
            state.comments = [];
        }).addCase(loadComments.fulfilled, (state, action) => {
            state.commentsStatus = "idle";
            state.comments = action.payload;
        }).addCase(loadComments.rejected, (state) => {
            state.commentsStatus = "failed";
        })
    },
})

// Reducer
export default openedPostSlice.reducer;

// Actions
export const { triggerLike, closePost } = openedPostSlice.actions;

//Selectors
export const selectOpenedPost = (state: RootState) => state.openedPost.post;
export const selectOpenedComments = (state: RootState) => state.openedPost.comments;
export const selectOpenedPostStatus = (state: RootState) => state.openedPost.postStatus;
export const selectOpenedCommentsStatus = (state: RootState) => state.openedPost.commentsStatus;