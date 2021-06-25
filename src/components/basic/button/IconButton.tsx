import classNames from "classnames";
import { FC } from "react";
import styles from "./IconButton.module.scss";

interface IconButtonParameters extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string
    checked?: boolean
    checkedColor?: "grey" | "red"
    text?: string
    className?: string
}

export const IconButton: FC<IconButtonParameters> = (
    {
        icon,
        text,
        checkedColor = "red",
        checked = false,
        className,
        ...otherArgs
    }) => {

    return (
        <button className={classNames({
            [styles.iconButton]: true,
        }, className)} {...otherArgs}>
            <i className={classNames({
                "icon": true,
                [`icon-${icon}`]: true,
                [checkedColor]: checked
            })}/>
            <span>{text}</span>
        </button>
    )
}