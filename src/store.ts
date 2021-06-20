import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import localizationReducer from "./slices/localizationSlice";
import postsReducer from "./slices/postsSlice";
import profileReducer from "./slices/profileSlice";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        profile: profileReducer,
        localization: localizationReducer
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;