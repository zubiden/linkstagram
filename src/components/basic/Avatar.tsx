import classNames from "classnames";
import { FC } from "react";
import styles from "./Avatar.module.scss";

type AvatarProps = {
    url: string,
    size?: string,
    border?: boolean
    className?: string
}

export const Avatar: FC<AvatarProps> = ({url, size = "4em", border = false, className, ...otherArgs}) => {
    return (
        <div className={styles.square} {...otherArgs} style={{width: size}}>
            <div className={classNames({
                [styles.border]: true,
                [styles.visible]: border
            }, className)}>
                <img src={url} className={styles.avatar} alt="Avatar"/>
            </div>
        </div>
    )
}