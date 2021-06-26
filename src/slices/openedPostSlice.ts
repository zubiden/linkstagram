import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IComment, IPost } from "../types";
import { fetchComments, fetchPost, leaveComment } from "../util/api";

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

const openedPostSlice = createSlice({
    name: "openedPost",
    initialState,
    reducers: {
        closePost(state) {
            state.post = null;
            state.comments = [];
        },
        setOpenedPost(state, action: PayloadAction<IPost>) {
            state.post = action.payload
            state.postStatus = "idle"
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
export const {closePost, setOpenedPost } = openedPostSlice.actions;

//Selectors
export const selectOpenedPost = (state: RootState) => state.openedPost.post;
export const selectOpenedComments = (state: RootState) => state.openedPost.comments;
export const selectOpenedPostStatus = (state: RootState) => state.openedPost.postStatus;
export const selectOpenedCommentsStatus = (state: RootState) => state.openedPost.commentsStatus;