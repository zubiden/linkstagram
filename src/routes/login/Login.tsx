import { Field, FieldProps, Form, Formik } from "formik";
import { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../../components/basic/button/Button";
import { Input, InputParameters } from "../../components/basic/input/Input";
import { Header } from "../../components/header/Header";
import { fetchCurrentAccount, selectIsLoggedIn } from "../../slices/profileSlice";
import { createAccount, fetchProfile, login } from "../../util/api";
import { IS_DESKTOP } from "../../util/contants";
import { useAppDispatch, useAppSelector, useLocalization } from "../../util/hooks";
import styles from "./Login.module.scss";

type FormValues = {
    email: string
    username: string
    password: string
}

const Login: FC = () => {
    const lp = useLocalization();
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const [signUp, setSignUp] = useState(false);

    const schema = Yup.object().shape({
        email: Yup.string()
                    .email(lp("login_validation_email_invalid"))
                    .required(lp("login_validation_required")),
        username: signUp ? Yup.string()
                    .min(3, lp("login_validation_min_length", {count: "3"}, 3))
                    .max(20, lp("login_validation_max_length", {count: "20"}, 20))
                    .matches(/^[a-zA-Z0-9._-]*$/, "Use alphabet, numbers and _ -")
                    .test("isTaken", lp("login_validation_username_taken"), value => { // test if username is taken
                        if(!value) return true;
                        return new Promise((resolve, reject) => {
                            fetchProfile(value).then((json) => {
                                resolve(false)
                            }).catch(() => {
                                resolve(true)
                            })
                        })
                    })
                    .required(lp("login_validation_required")): Yup.string(),
        password: Yup.string()
                    .min(6, lp("login_validation_min_length", {count: "6"}, 6))
                    .required(lp("login_validation_required"))
    });

    if(isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <div className={styles.login}>
            <Header />
            <div className={styles.content}>
                <div className={styles.presentation}>
                    Photos go wroom
                </div>
                <div className={styles.authPane}>
                    <div className={styles.title}>{lp(signUp ? "login_sign_up" : "login_login")}</div>

                    <Formik
                        initialValues={{
                            email: "",
                            username: "",
                            password: ""
                        }}
                        onSubmit={async (values: FormValues) => {
                            if(signUp) {
                                createAccount({login: values.email, password: values.password, username: values.username})
                                    .then(() => dispatch(fetchCurrentAccount()))
                            } else {
                                login({login: values.email, password: values.password})
                                    .then(() => dispatch(fetchCurrentAccount()))
                            }
                        }}
                        validationSchema={schema}
                    >
                        <Form>
                            <Field
                                name="email"
                                type="email"
                                component={FormikWrapperInput}
                                label={lp("login_field_email_label")}
                                placeholder={lp("login_field_email_placeholder")}
                            />
                            {signUp && <Field
                                name="username"
                                component={FormikWrapperInput}
                                label={lp("login_field_username_label")}
                                placeholder={lp("login_field_username_placeholder")}
                            />}
                            <Field
                                name="password"
                                component={FormikWrapperInput}
                                type="password"
                                label={lp("login_field_password_label")}
                                placeholder={lp("login_field_password_placeholder")}
                            />
                            <div className={styles.mobileSeparator}/>
                            {/* Designer is shuffling buttons */}
                            {IS_DESKTOP() && <SubmitButton signUp={signUp}/>}
                            <div className={styles.switch}>
                                {lp(signUp ? "login_have_account" : "login_no_account")}
                                <span className={styles.inlineSwitch} onClick={() => setSignUp(!signUp)}>
                                    {lp(signUp ? "login_login" : "login_sign_up")}
                                </span>
                            </div>
                            {!IS_DESKTOP() && <SubmitButton signUp={signUp}/>}
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

const SubmitButton: FC<{signUp: boolean}> = ({signUp = false}) => {
    const lp = useLocalization();
    return (
        <Button className={styles.button} color="blue" type="submit">
            {lp(signUp ? "login_sign_up_button" : "login_login_button")}
        </Button>
    )
}

const FormikWrapperInput: FC<InputParameters & FieldProps> = ({ field, form: { touched, errors, setFieldValue, values }, ...otherProps }) => {
    return (
        <div className={styles.input}>
            <Input onChange={e => setFieldValue(field.name, e.currentTarget.value)} name={field.name} value={values[field.name]} {...otherProps} />
            {touched[field.name] && errors[field.name] && <div className={styles.error}>{errors[field.name]}</div>}
        </div>
    )
}

export default Login;