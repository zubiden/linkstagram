import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LanguageValue } from "../types";

export const LANGUAGE_FOLDER = "language";

export const VALID_LANGUAGES: { [key: string]: string } = {
    "uk": "UA",
    "en": "EN"
}

export interface StringsMap {
    [key: string]: string | LanguageValue
}

export interface LocalizationState {
    strings: StringsMap
    code: string
    status: "idle" | "loading" | "failed";
}

const initialState: LocalizationState = {
    strings: {},
    code: localStorage.getItem("langCode") || "en",
    status: "idle",
}

export const setLanguage = createAsyncThunk(
    "localization/setLanguage",
    async (code: string, thunkAPI) => {
        if (code in VALID_LANGUAGES) {
            const state = thunkAPI.getState() as RootState;
            const strings = selectTranslationStrings(state);
            if(Object.keys(strings).length && code === selectLanguageCode(state)) {
                return strings; // don't make request to fetch active language
            }
            
            return fetch(`${LANGUAGE_FOLDER}/${code}.json`)
                .then(res => res.json())
                .then(json => {
                    let strings: StringsMap = {};
                    for (let key in json) {
                        strings[key] = json[key];
                    }

                    localStorage.setItem("langCode", code);
                    thunkAPI.dispatch(setLanguageCode(code));

                    return strings;
                });
        } else {
            throw new Error("Not a valid language!");
        }
    }
);

const localizationSlice = createSlice({
    name: "localization",
    initialState,
    reducers: {
        setLanguageCode(state, action: PayloadAction<string>) {
            state.code = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setLanguage.pending, (state) => {
            state.status = "loading";
        }).addCase(setLanguage.fulfilled, (state, action) => {
            state.status = "idle";
            state.strings = action.payload;
        })
    },
})

// Reducer
export default localizationSlice.reducer;

// Actions
const { setLanguageCode } = localizationSlice.actions;

//Selectors

export const selectLanguageCode = (state: RootState) => state.localization.code;
export const selectTranslationStrings = (state: RootState) => state.localization.strings;