import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IComment } from "../types";
import { fetchComments } from "../util/api";

export interface CommentsState {
    loadedComments: IComment[];
    currentPostId: number
    status: "idle" | "loading" | "failed";
}

const initialState: CommentsState = {
    loadedComments: [],
    currentPostId: -1,
    status: "idle",
}

export const fetchAllComments = createAsyncThunk(
    "comments/fetchAllPosts",
    async (post_id: number, thunkAPI) => {
        thunkAPI.dispatch(setCurrentPostId(post_id));
        return fetchComments(post_id);
    }
  );

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setCurrentPostId(state, action: PayloadAction<number>) {
            state.currentPostId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllComments.pending, (state) => {
            state.status = "loading";
            state.loadedComments = [];
        }).addCase(fetchAllComments.fulfilled, (state, action) => {
            state.status = "idle";
            state.loadedComments = action.payload;
        }).addCase(fetchAllComments.rejected, (state) => {
            state.status = "failed";
        });
    },
})

// Reducer
export default commentsSlice.reducer;

// Actions
const { setCurrentPostId } = commentsSlice.actions;

//Selectors

export const selectLoadedComments = (state: RootState) => state.comments.loadedComments;
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCurrentCommentsPostId = (state: RootState) => state.comments.currentPostId;