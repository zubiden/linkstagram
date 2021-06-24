import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProfile } from "../types";
import { editAccount, fetchAccount, fetchProfiles, IError, IProfileUpdateParameters } from "../util/api";
import { fetchAllPosts, selectCurrentPostsUsername } from "./postsSlice";

export interface ProfileState {
    account: IProfile | null;
    allProfiles: IProfile[]
    profilesFetchStatus: "idle" | "loading" | "failed";
    accountFetchStatus: "idle" | "loading" | "failed";
}

const initialState: ProfileState = {
    account: null,
    allProfiles: [],
    profilesFetchStatus: "idle",
    accountFetchStatus: "idle"
}

export const fetchAllProfiles = createAsyncThunk(
    "profile/fetchAllProfiles",
    async () => {
        // DANGER! Possibly, a lot of requests if Linkstagram decides to get several million new users
        let notEnd = true;
        let profiles: IProfile[] = [];
        let currentPage = 1;
        while(notEnd) {
            const downloaded = await fetchProfiles(currentPage);

            if(downloaded.length && !profiles.find(profile => profile.username === downloaded[0].username)) {
                profiles.push(...downloaded);
            } else {
                notEnd = false;
            }
            currentPage++;
        }
        return profiles;
    }
);

export const fetchCurrentAccount = createAsyncThunk(
    "profile/fetchAccount",
    async () => {
        const account = await fetchAccount();
        if(isError(account)) {
            return null;
        } else {
            return account;
        }
    }
);

export const updateAccount = createAsyncThunk(
    "profile/updateAccount",
    async (newInfo: IProfileUpdateParameters, thunkAPI) => {
        const res = await editAccount(newInfo);
        if("error" in res) {
            throw Error("Failed to update account")
        } else {
            thunkAPI.dispatch(fetchAllPosts(selectCurrentPostsUsername(thunkAPI.getState() as RootState)));
            return res;
        }
    }
);

export const logout = createAsyncThunk(
    "profile/logount",
    async (arg, thunkAPI) => {
        localStorage.removeItem("auth");
        thunkAPI.dispatch(clearCurrentAccount());
        thunkAPI.dispatch(fetchAllPosts()); // refetch posts to remove likes
    }
);

function isError(res: any): res is IError {
    return !!(res as IError).error;
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearCurrentAccount(state) {
            state.account = null;
        },

        resetAccountFetchStatus(state) {
            state.accountFetchStatus = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
        // profiles
        .addCase(fetchAllProfiles.pending, (state) => {
            state.profilesFetchStatus = "loading";
        }).addCase(fetchAllProfiles.fulfilled, (state, action) => {
            state.profilesFetchStatus = "idle";
            state.allProfiles = action.payload;
        }).addCase(fetchAllProfiles.rejected, (state) => {
            state.profilesFetchStatus = "failed";
            state.allProfiles = [];
        })
        // account
        .addCase(fetchCurrentAccount.pending, (state) => {
            state.accountFetchStatus = "loading";
        }).addCase(fetchCurrentAccount.fulfilled, (state, action) => {
            state.accountFetchStatus = "idle";
            state.account = action.payload;
        }).addCase(fetchCurrentAccount.rejected, (state) => {
            state.accountFetchStatus = "failed";
            state.account = null;
            localStorage.removeItem("auth"); // Should I do this here? IDK what place is better
        })
        .addCase(updateAccount.fulfilled, (state, action) => {
            state.account = action.payload
        })
    },
})

// Reducer
export default profileSlice.reducer;

// Actions
export const { clearCurrentAccount, resetAccountFetchStatus } = profileSlice.actions;

// Selectors
export const selectProfiles = (state: RootState) => state.profile.allProfiles;
export const selectProfilesFetchStatus = (state: RootState) => state.profile.profilesFetchStatus;
export const selectAccount = (state: RootState) => state.profile.account;
export const selectAccountFetchStatus = (state: RootState) => state.profile.accountFetchStatus;
export const selectIsLoggedIn = (state: RootState) => !!state.profile.account;
export const selectIsLoggingIn = (state: RootState) => state.profile.accountFetchStatus === "loading";
