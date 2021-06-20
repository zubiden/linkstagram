import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/basic/Button";
import { Input } from "../components/basic/Input";
import { Header } from "../components/Header";
import { selectAccount } from "../slices/profileSlice";
import { createAccount, login } from "../util/api";
import { useAppSelector, useLocalization } from "../util/hooks";
import styles from "./Login.module.scss";

const Login: FC = () => {
    const lp = useLocalization();
    const history = useHistory();

    const account = useAppSelector(selectAccount);

    useEffect(() => {
        if(account) history.replace("/");
    }, [account, history]);

    const [signUp, setSignUp] = useState(false); 

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.login}>
            <Header/>
            <div className={styles.content}>
                <div className={styles.presentation}>
                    Photos go wroom
                </div>
                <div className={styles.authPane}>
                    <div className={styles.title}>{lp(signUp ? "login_sign_up" : "login_login")}</div>

                    <Input 
                        label={lp("login_field_email_label")} 
                        placeholder={lp("login_field_email_placeholder")}
                        type="email"
                        className={styles.input}
                        onChange={ev => setEmail(ev.currentTarget.value)}
                        value={email}
                    />
                    {signUp && <Input 
                        label={lp("login_field_username_label")} 
                        placeholder={lp("login_field_username_placeholder")}
                        className={styles.input}
                        onChange={ev => setUsername(ev.currentTarget.value)}
                        value={username}
                    />}
                    <Input 
                        label={lp("login_field_password_label")} 
                        placeholder={lp("login_field_password_placeholder")}
                        type="password"
                        className={styles.input}
                        onChange={ev => setPassword(ev.currentTarget.value)}
                        value={password}
                    />

                    <Button color="blue" onClick={() => {
                        // TODO validate fields
                        if(signUp) {
                            createAccount({login: email, password, username}).then(() => history.push("/"));
                        } else {
                            login({login: email, password}).then(() => history.push("/"));
                        }
                    }}>
                        {lp(signUp ? "login_sign_up_button" : "login_login_button")}
                    </Button>
                    <div className={styles.switch}>
                        {lp(signUp ? "login_have_account" : "login_no_account")}
                        <span className={styles.inlineSwitch} onClick={() => setSignUp(!signUp)}>
                            {lp(signUp? "login_login" : "login_sign_up")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;