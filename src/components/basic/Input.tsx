import classNames from "classnames";
import { FC } from "react";
import styles from "./Input.module.scss";

interface InputParameters extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    placeholder?: string
    icon?: string
    iconColor?: string
    className?: string
    [key: string]: any
}

export const Input: FC<InputParameters> = ({label, placeholder, icon, iconColor, className, ...otherParams}) => {
    return (
        <label className={classNames({
            [styles.input]: true
            }, className)}>
            {label}
            <input placeholder={placeholder} {...otherParams}/>
        </label>
    )
}