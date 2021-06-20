import { FC } from "react";
import { useLocalization } from "../util/hooks";
import styles from "./Footer.module.scss";

const CURRENT_YEAR = 2021;

export const Footer: FC = () => {
    const lp = useLocalization();

    return (
        <footer className={styles.footer}>
            <div className={styles.buttonRow}>
                <GreyButton text={lp("footer_about")}/>
                <GreyButton text={lp("footer_help")}/>
                <GreyButton text={lp("footer_privacy")}/>
                <GreyButton text={lp("footer_terms")}/>
                <GreyButton text={lp("footer_locations")}/>
                <GreyButton text={lp("footer_language")}/>
            </div>
            <div className={styles.buttonRow}>
                <GreyButton text={lp("footer_copyright", {year: CURRENT_YEAR.toString()})}/>
            </div>
        </footer>
    )
}

const GreyButton: FC<{text: string}> = ({text}) => {
    return <div className={styles.greyButton}>{text}</div>
}