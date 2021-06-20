import classNames from "classnames";
import { FC } from "react";
import styles from "./Avatar.module.scss";

type AvatarProps = {
    url: string,
    size?: string,
    border?: boolean
}

export const Avatar: FC<AvatarProps> = ({url, size = "4em", border = false, ...otherArgs}) => {
    return (
        <div className={styles.square} {...otherArgs} style={{width: size}}>
            <div className={classNames({
                [styles.border]: true,
                [styles.visible]: border
            })}>
                <img src={url} className={styles.avatar} alt="Avatar"/>
            </div>
        </div>
    )
}