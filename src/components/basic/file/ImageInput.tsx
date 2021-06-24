import Uppy from "@uppy/core";
import classNames from "classnames";
import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { addFile } from "../../../util/uppy";
import styles from "./ImageInput.module.scss";

interface ImageInputProps {
    uppy: Uppy.Uppy
    accept?: string[]
    text?: string
    className?: string
    getFiles?: Function
    defaultPreviewUrl?: string
}

export const ImageInput: FC<ImageInputProps> = ({ uppy, accept = [], text, defaultPreviewUrl, className }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        // clear and re-add files on change
        uppy.getFiles().forEach(file => uppy.removeFile(file.id));
        files.forEach(file => addFile(uppy, file));
    }, [files, uppy]);

    const preventEvent = (ev: SyntheticEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
    }

    return (
        <div className={classNames({
            [styles.file]: true
        }, className)}
            onClick={() => inputRef.current?.click()}
            onDragOver={preventEvent}
            onDragEnter={preventEvent}
            onDragLeave={preventEvent}
            onDrop={ev => {
                ev.preventDefault();
                setFiles(Array.from(ev.dataTransfer.files))
            }}
        >
            <div className={styles.preview}>
                {files.length ? 
                    files.map(file => <img src={URL.createObjectURL(file)} alt="Preview"/>) 
                    : defaultPreviewUrl ? 
                        <img src={defaultPreviewUrl} alt="Preview"/> 
                            : text}
            </div>
            <input type="file" accept={accept.join(",")} ref={inputRef} hidden onChange={ev => {
                if (ev.target.files?.length) {
                    setFiles(Array.from(ev.target.files))
                }
            }
            } />
        </div>
    )
}