import classNames from "classnames";
import { FC } from "react";
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import styles from "./TextArea.module.scss";

interface TextAreaParameters extends TextareaAutosizeProps{
    label?: string
    placeholder?: string
    className?: string
    [key: string]: any
}

export const TextArea: FC<TextAreaParameters> = ({label, placeholder, className, ...otherParams}) => {
    return (
        <label className={classNames({
            [styles.textArea]: true
            }, className)}
        >
            {label}
            <TextareaAutosize placeholder={placeholder} {...otherParams}/>
        </label>
    )
}