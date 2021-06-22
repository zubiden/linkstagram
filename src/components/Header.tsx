import classNames from "classnames";
import { FC, useState } from "react";
import { selectLanguageCode, setLanguage, VALID_LANGUAGES } from "../slices/localizationSlice";
import { selectAccount, selectIsLoggedIn } from "../slices/profileSlice";
import { IProfile } from "../types";
import { useAppDispatch, useAppSelector, useLocalization } from "../util/hooks";
import { Avatar } from "./basic/Avatar";
import { Button } from "./basic/Button";
import styles from "./Header.module.scss";

type HeaderParameters = {
    home?: boolean
    profile?: boolean
}

export const Header: FC<HeaderParameters> = ({home = false, profile = false}) => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const account = useAppSelector(selectAccount) as IProfile;

    const lp = useLocalization();
    const langCode = useAppSelector(selectLanguageCode);

    const [dropdown, setDropdown] = useState(false);

    return (
        <>
        <header className={styles.header}>
            <div className={styles.logo}>Linkstagram</div>
            <div className={styles.separator}/>
            {home && <Button color="black" className={styles.button} to="/">{lp("header_home")}</Button>}
            <Button color="white" className={styles.button} lightBorder square onClick={() => setDropdown(!dropdown)}>
                {VALID_LANGUAGES[langCode]}
                <div className={classNames({
                    [styles.dropdown]: true,
                    [styles.hidden]: !dropdown
                    })} onClick={() => setDropdown(false)}>
                    {Object.entries(VALID_LANGUAGES).map(([key, value]) => (
                            <div className={styles.dropdownItem} key={key} onClick={() => dispatch(setLanguage(key))}>
                                {value}
                            </div>
                        )
                    )}
                </div>
            </Button>
            {profile && isLoggedIn && <Avatar url={account.profile_photo_url} size="2.5em"/>}
        </header>
        <div className={styles.reserver}/>
        </>
    )
}