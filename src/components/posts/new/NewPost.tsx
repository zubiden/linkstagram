import { FC, useEffect, useState } from "react";
import { createOwnPost } from '../../../slices/postsSlice';
import { useAppDispatch, useLocalization } from "../../../util/hooks";
import { getUppy, transformFileData } from '../../../util/uppy';
import { Button } from "../../basic/button/Button";
import { ImageInput } from "../../basic/file/ImageInput";
import { Modal } from '../../basic/modal/Modal';
import { TextArea } from "../../basic/textarea/TextArea";
import styles from "./NewPost.module.scss";

type NewPostParameters = {
    opened?: boolean
    onRequestClose?(event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>): void
}

const uppy = getUppy();

export const NewPost: FC<NewPostParameters> = ({ opened = false, onRequestClose }) => {
    const lp = useLocalization();
    const dispatch = useAppDispatch();

    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!opened) {
            setDescription("");
            setError("");
            uppy.reset();
        }
    }, [opened])

    return (
        <Modal className={styles.newPost} isOpen={opened} onRequestClose={onRequestClose}>
            <ImageInput
                text={lp("post_new_file")}
                className={styles.input}
                uppy={uppy}
                multiple
                accept={["image/png", "image/jpg", "image/jpeg"]}
                onFailedFiles={files => setError(lp("post_new_failed_to_select", { files: files.map(el => el.name).join(",") }))}
                onFilesSelected={() => setError("")}
            />
            {error && <div className={styles.error}>{error}</div>}
            <TextArea
                className={styles.description}
                minRows={3}
                placeholder={lp("post_new_description_placeholder")}
                label={lp("post_new_description")}
                onChange={ev => setDescription(ev.currentTarget.value)}
                value={description}
            />
            <div className={styles.buttons}>
                <Button lightBorder onClick={onRequestClose}>{lp("general_cancel")}</Button>
                <Button color="blue" onClick={async ev => {
                    let result;
                    try {
                        result = await uppy.upload()
                    } catch (ex) {
                        setError(ex);
                        return;
                    }
                    // move this code into util
                    if (result.failed.length) {
                        setError(lp("post_new_failed_to_upload", { files: result.failed.map(el => el.name).join(",") }))
                        return;
                    }

                    if (result.successful.length) {
                        const images = transformFileData(result.successful);
                        dispatch(createOwnPost({
                            description,
                            photos_attributes: images.map(image => ({ image }))
                        }))
                        onRequestClose?.(ev);
                    } else if (result.successful.length === 0 && result.failed.length === 0) {
                        // text post, without images
                        if (description) {
                            dispatch(createOwnPost({
                                description,
                                photos_attributes: []
                            }))
                            onRequestClose?.(ev);
                        }
                    }
                }}>{lp("post_new_post")}</Button>
            </div>
        </Modal>
    )
}