import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';
import { FC, useEffect, useState } from "react";
import { createOwnPost } from '../../slices/postsSlice';
import { API_BASE, IPostCreationParameters } from '../../util/api';
import { useAppDispatch, useLocalization } from "../../util/hooks";
import { Button } from "../basic/Button";
import { Modal } from '../basic/Modal';
import { TextArea } from "../basic/TextArea";
import styles from "./NewPost.module.scss";

type NewPostParameters = {
    opened?: boolean
    onRequestClose?(event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>): void
}

const uppy = Uppy({
    restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"]
    },
})

uppy.use(AwsS3, {
    companionUrl: API_BASE,
})

export const NewPost: FC<NewPostParameters> = ({ opened = false, onRequestClose }) => {
    const lp = useLocalization();
    const dispatch = useAppDispatch();

    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!opened) {
            // reset on close
            setDescription("");
        }
    }, [opened])

    return (
        <Modal className={styles.newPost} isOpen={opened} onRequestClose={onRequestClose}>
            <DragDrop
                uppy={uppy}
                locale={{ strings: { dropHereOr: lp("post_new_file") } }}
            />
            <TextArea
                className={styles.description}
                rows={5}
                placeholder={lp("post_new_description_placeholder")}
                label={lp("post_new_description")}
                onChange={ev => setDescription(ev.currentTarget.value)}
                value={description}
            />
            <div className={styles.buttons}>
                <Button lightBorder onClick={onRequestClose}>{lp("general_cancel")}</Button>
                <Button color="blue" onClick={async ev => {
                    // TODO separate logic into util, preview image
                    const result = await uppy.upload()
                    console.log(result);
                    if (result.successful.length) {
                        // how am I supposed to get id and storage, except parsing string!?
                        const data = result.successful[0].data;
                        const meta = result.successful[0].meta;
                        const key: string = (meta as any).key;
                        const storage = key.split("/")[0];
                        const id = key.split("/")[1];
                        const params: IPostCreationParameters = {
                            description,
                            photos_attributes: [
                                {
                                    image: {
                                        id: id,
                                        storage: storage,
                                        metadata: {
                                            filename: meta.name,
                                            size: data.size,
                                            mime_type: data.type
                                        }
                                    }
                                }
                            ]
                        }

                        dispatch(createOwnPost(params));
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