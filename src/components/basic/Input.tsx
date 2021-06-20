import classNames from "classnames";
import { FC } from "react";
import styles from "./Input.module.scss";

type InputParameters = {
    label?: string
    placeholder?: string
    icon?: string
    iconColor?: string
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    [key: string]: any
}

export const Input: FC<InputParameters> = ({label, placeholder, icon, iconColor, className, onChange, ...otherParams}) => {
    return (
        <label className={classNames({
            [styles.input]: true
            }, className)}>
            {label}
            <input placeholder={placeholder} onChange={onChange} {...otherParams}/>
        </label>
    )
}