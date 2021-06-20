import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProfile } from "../types";
import { fetchAccount, fetchProfiles, IError } from "../util/api";

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
        return fetchProfiles();
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

function isError(pet: IError | any): pet is IError {
    return !!(pet as IError).error;
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        logout(state) {
            state.account = null;
            localStorage.removeItem("auth");
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
        })
    },
})

// Reducer
export default profileSlice.reducer;

// Actions
export const { logout, resetAccountFetchStatus } = profileSlice.actions;

// Selectors
export const selectProfiles = (state: RootState) => state.profile.allProfiles;
export const selectProfilesFetchStatus = (state: RootState) => state.profile.profilesFetchStatus;
export const selectAccount = (state: RootState) => state.profile.account;
export const selectAccountFetchStatus = (state: RootState) => state.profile.accountFetchStatus;
export const selectIsLoggedIn = (state: RootState) => !!state.profile.account;