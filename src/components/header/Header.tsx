import { FC } from "react";
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";
import { selectLanguageCode, setLanguage, VALID_LANGUAGES } from "../../slices/localizationSlice";
import { selectAccount, selectIsLoggedIn } from "../../slices/profileSlice";
import { IProfile } from "../../types";
import { useAppDispatch, useAppSelector, useLocalization } from "../../util/hooks";
import { Avatar } from "./../basic/avatar/Avatar";
import { Button } from "./../basic/button/Button";
import styles from "./Header.module.scss";

type HeaderParameters = {
    home?: boolean
    profile?: boolean
    login?: boolean
}

export const Header: FC<HeaderParameters> = ({home = false, profile = false, login = false}) => {
    const dispatch = useAppDispatch();
    const lp = useLocalization();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const account = useAppSelector(selectAccount) as IProfile;
    const langCode = useAppSelector(selectLanguageCode);

    const dropdownOptions = Object.entries(VALID_LANGUAGES).map(([key, value]) => ({value: key, label: value, className: styles.option}));

    return (
        <>
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>Linkstagram</Link>
            <div className={styles.separator}/>
            {home && <Button color="black" className={styles.button} to="/">{lp("header_home")}</Button>}
            <Dropdown 
                options={dropdownOptions} 
                value={VALID_LANGUAGES[langCode]} 
                onChange={option => dispatch(setLanguage(option.value))}
                className={styles.dropdown}
                controlClassName={styles.control}
                placeholderClassName={styles.placeholder}
                menuClassName={styles.menu}
            />
            {login && !isLoggedIn && <Button color="black" className={styles.button} to="/login">{lp("general_login")}</Button>}
            {profile && isLoggedIn && <Avatar url={account.profile_photo_url} size="2.5em" to="/profile"/>}
        </header>
        <div className={styles.reserver}/>
        </>
    )
}