import Uppy from "@uppy/core";
import classNames from "classnames";
import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { IPhoto } from "../../../types";
import { addFile } from "../../../util/uppy";
import { Slider } from "../../slider/Slider";
import styles from "./ImageInput.module.scss";

interface ImageInputProps {
    uppy: Uppy.Uppy
    accept?: string[]
    multiple?: boolean
    text?: string
    className?: string
    defaultPreviewUrl?: string
    onFailedFiles?: (files: File[]) => void
    onFilesSelected?: (files: File[]) => void
}

export const ImageInput: FC<ImageInputProps> = ({ uppy, accept = ["image/*"], multiple = false, text, defaultPreviewUrl, className, onFailedFiles, onFilesSelected }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        // clear and re-add files on change
        uppy.getFiles().forEach(file => uppy.removeFile(file.id));

        let failedFiles: File[] = [];

        files.forEach(file => {
            try {
                addFile(uppy, file)
            } catch (ex) {
                failedFiles.push(file);
            }
        });
        // remove failed files from state
        if (failedFiles.length) {
            setFiles(files.filter(file => !failedFiles.includes(file)));
            onFailedFiles?.(failedFiles);
        }
    }, [files, uppy, onFailedFiles]);

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
                onFilesSelected?.(Array.from(ev.dataTransfer.files));
                setFiles(Array.from(ev.dataTransfer.files))
            }}
        >
            <div className={styles.preview}>
                {files.length ? <Slider photos={filesToPhotos(files)} className={styles.slider} /> :
                    defaultPreviewUrl ? <img src={defaultPreviewUrl} alt="Preview" /> : text}
            </div>
            <input type="file" accept={accept.join(",")} multiple={multiple} ref={inputRef} hidden onChange={ev => {
                if (ev.target.files?.length) {
                    onFilesSelected?.(Array.from(ev.target.files));
                    setFiles(Array.from(ev.target.files))
                }
            }
            } />
        </div>
    )
}

const filesToPhotos = (files: File[]): IPhoto[] => {
    return files.map((file, i) => ({ id: i, url: URL.createObjectURL(file) }));
}