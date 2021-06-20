import classNames from "classnames";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Button.module.scss";

type ButtonParameters = {
    color?: "blue" | "black" | "white"
    lightBorder?: boolean
    square?: boolean
    smallPadding?: boolean
    className?: string
    to?: string
    onClick?: Function
    [key: string]: any
}

export const Button: FC<ButtonParameters> = (
    {
        color = "white",
        lightBorder = false,
        square = false, to,
        onClick, className,
        children,
        smallPadding = false,
        ...otherArgs
    }) => {
    const history = useHistory();

    return (
        <button className={classNames({
            [styles.button]: true,
            [styles[color]]: true,
            [styles.square]: square,
            [styles.lightBorder]: lightBorder,
            [styles.smallPadding]: smallPadding
        }, className)}
            onClick={ev => {
                onClick?.(ev);
                if (to) history.push(to);
            }}
            {...otherArgs}>
            {children}
        </button>
    )
}