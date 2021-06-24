import classNames from "classnames";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Avatar.module.scss";

interface AvatarParameters extends React.HTMLAttributes<HTMLDivElement> {
    url?: string,
    size?: string,
    border?: boolean
    className?: string
    to?: string
    clickable?: boolean
}

const PLACEHOLDER = "images/placeholder.png";

export const Avatar: FC<AvatarParameters> = ({url, size = "4em", border = false, clickable, to, className, onClick, ...otherArgs}) => {
    url = url || PLACEHOLDER; // url can be null
    clickable = clickable || !!to || !!onClick;
    const history = useHistory();
    return (
        <div className={classNames({
            [styles.square]: true,
            [styles.clickable]: clickable
        })} style={{width: size}} onClick={ev => {
            onClick?.(ev);
            if (to) history.push(to);
        }} {...otherArgs}>
            <div className={classNames({
                [styles.border]: true,
                [styles.visible]: border
            }, className)}>
                <img src={url} className={styles.avatar} alt="Avatar"/>
            </div>
        </div>
    )
}