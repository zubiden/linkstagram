import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPost } from "../types";
import { createPost, deletePost, fetchPost, fetchPosts, fetchUserPosts, IPostCreationParameters, removeLike, setLike } from "../util/api";
import { selectOpenedPost, setOpenedPost } from "./openedPostSlice";

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
    async (username: string | null | undefined, thunkAPI) => {
        thunkAPI.dispatch(setCurrentPostsUsername(username || null));
        // DANGER! Possibly, a lot of requests if Linkstagram decides to get several million new posts
        // TODO load posts on demand
        let notEnd = true;
        let posts: IPost[] = [];
        let currentPage = 1;
        while(notEnd) {
            const downloaded = await (!!username ? fetchUserPosts(username, currentPage) : fetchPosts(currentPage));
            if(downloaded.length && !posts.find(post => post.id === downloaded[0].id)) {
                posts.push(...downloaded);
            } else {
                notEnd = false;
            }
            currentPage++;
        }
        return posts;  

    }
);

export const refetchPost = createAsyncThunk(
    "posts/fetchPost",
    async (post_id: number, thunkAPI) => {
        const post = await fetchPost(post_id);
        // update opened post on refetch
        const opened = selectOpenedPost(thunkAPI.getState() as RootState);
        if(opened?.id === post.id) thunkAPI.dispatch(setOpenedPost(post));

        return post;
    }
);

export const likePost = createAsyncThunk(
    "posts/like",
    async (post_id: number, thunkAPI) => {
        await setLike(post_id);
        thunkAPI.dispatch(refetchPost(post_id));
    }
);

export const dislikePost = createAsyncThunk(
    "posts/dislike",
    async (post_id: number, thunkAPI) => {
        await removeLike(post_id);
        thunkAPI.dispatch(refetchPost(post_id));
    }
);

export const deleteOwnPost = createAsyncThunk(
    "posts/delete",
    async (post_id: number, thunkAPI) => {
        await deletePost(post_id);
        thunkAPI.dispatch(removePost(post_id));
    }
);

export const createOwnPost = createAsyncThunk(
    "posts/post",
    async (params: IPostCreationParameters, thunkAPI) => {
        await createPost(params);

        // TODO: refractor?
        thunkAPI.dispatch(fetchAllPosts(selectCurrentPostsUsername(thunkAPI.getState() as RootState)));
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setCurrentPostsUsername(state, action: PayloadAction<string | null>) {
            state.currentPostsUsername = action.payload
        },
        removePost(state, action: PayloadAction<number>) {
            state.loadedPosts = state.loadedPosts.filter(post => post.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllPosts.pending, (state) => {
            state.status = "loading";
            state.loadedPosts = [];
        }).addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.status = "idle";
            state.loadedPosts = action.payload;
        }).addCase(fetchAllPosts.rejected, (state) => {
            state.status = "failed";
        })
        .addCase(refetchPost.fulfilled, (state, action) => {
            const id = state.loadedPosts.findIndex(post => post.id === action.payload.id);
            if(id !== -1) { // post is currently in state
                state.loadedPosts[id] = action.payload;
            }
        })
    },
})

// Reducer
export default postsSlice.reducer;

// Actions
const { setCurrentPostsUsername, removePost } = postsSlice.actions;

//Selectors

export const selectLoadedPosts = (state: RootState) => state.posts.loadedPosts;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectCurrentPostsUsername = (state: RootState) => state.posts.currentPostsUsername;