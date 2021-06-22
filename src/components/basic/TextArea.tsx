import classNames from "classnames";
import { FC } from "react";
import styles from "./TextArea.module.scss";

interface TextAreaParameters extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    placeholder?: string
    rows?: number
    className?: string
    [key: string]: any
}

export const TextArea: FC<TextAreaParameters> = ({label, placeholder, className, ...otherParams}) => {
    return (
        <label className={classNames({
            [styles.textArea]: true
            }, className)}>
            {label}
            <textarea placeholder={placeholder} {...otherParams}/>
        </label>
    )
}