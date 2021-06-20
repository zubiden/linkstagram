import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPost } from "../types";
import { fetchPosts, fetchUserPosts } from "../util/api";

export interface PostsState {
    loadedPosts: IPost[];
    currentPostsUsername: string | null;
    status: "idle" | "loading" | "failed";
}

const initialState: PostsState = {
    loadedPosts: [],
    currentPostsUsername: null,
    status: "idle",
}

export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async (username: string | undefined, thunkAPI) => {
        if(selectCurrentPostsUsername(thunkAPI.getState() as RootState) === username) {
            return selectLoadedPosts(thunkAPI.getState() as RootState);// don't fetch, if current user posts already loaded
        } 
        
        if(username) {
            thunkAPI.dispatch(setCurrentPostsUsername(username));
            return fetchUserPosts(username);
        } else {
            thunkAPI.dispatch(setCurrentPostsUsername(null));
            return fetchPosts();
        }
    }
  );

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setCurrentPostsUsername(state, action: PayloadAction<string | null>) {
            state.currentPostsUsername = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.status = "loading";
            state.loadedPosts = [];
        }).addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.status = "idle";
            state.loadedPosts = action.payload;
        }).addCase(fetchAllPosts.rejected, (state) => {
            state.status = "failed";
        });
    },
})

// Reducer
export default postsSlice.reducer;

// Actions
const { setCurrentPostsUsername } = postsSlice.actions;

//Selectors

export const selectLoadedPosts = (state: RootState) => state.posts.loadedPosts;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectCurrentPostsUsername = (state: RootState) => state.posts.currentPostsUsername;