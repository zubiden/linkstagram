import {
    HashRouter, Redirect, Route, Switch
} from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import OwnProfile from "./routes/OwnProfile";
import Profile from "./routes/Profile";
import { selectLanguageCode, setLanguage } from "./slices/localizationSlice";
import { fetchCurrentAccount } from "./slices/profileSlice";
import { useAppDispatch, useAppSelector, useMountEffect } from "./util/hooks";


function App() {
    const dispatch = useAppDispatch();
    const code = useAppSelector(selectLanguageCode);

    // on first render
    useMountEffect(() => {
        dispatch(setLanguage(code));

        if(localStorage.getItem("auth")) dispatch(fetchCurrentAccount());
    });

    return (
        <HashRouter>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/profile/:username">
                    <Profile />
                </Route>
                <Route exact path="/profile">
                    <OwnProfile />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default App;
