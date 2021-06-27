import classNames from "classnames";
import { FC, MouseEventHandler } from "react";
import styles from "./Toast.module.scss";

type ToastParams = {
    text: string
    show?: boolean
    className?: string
    onClick?: MouseEventHandler<HTMLElement>
    onClose?: MouseEventHandler<HTMLElement>
}

export const Toast: FC<ToastParams> = ({ text, show = false, className, onClick, onClose }) => {
    return (
        <div className={classNames({
            [styles.toast]: true,
            [styles.show]: show
        }, className)} onClick={onClick}>
            <div className={styles.text}>
                {text}
            </div>
            <i className={`icon icon-cross ${styles.close}`} onClick={ev => {
                ev.stopPropagation();
                onClose?.(ev);
            }} />
        </div>
    )
}