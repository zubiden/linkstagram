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

    useEffect(() => {
        if (!opened) {
            setDescription("");
        }
    }, [opened])

    return (
        <Modal className={styles.newPost} isOpen={opened} onRequestClose={onRequestClose}>
            <ImageInput text={lp("post_new_file")} className={styles.input} uppy={uppy} />
            <TextArea
                className={styles.description}
                minRows={5}
                placeholder={lp("post_new_description_placeholder")}
                label={lp("post_new_description")}
                onChange={ev => setDescription(ev.currentTarget.value)}
                value={description}
            />
            <div className={styles.buttons}>
                <Button lightBorder onClick={onRequestClose}>{lp("general_cancel")}</Button>
                <Button color="blue" onClick={async ev => {
                    const result = await uppy.upload()
                    // TODO handle errors, move this code into util
                    if (result.successful.length) {
                        const images = transformFileData(result.successful);
                        dispatch(createOwnPost({
                            description,
                            photos_attributes: images.map(image => ({ image }))
                        }))
                        onRequestClose?.(ev);
                    } else if (result.successful.length === 0 && result.failed.length === 0) {
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