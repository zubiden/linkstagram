import classNames from "classnames";
import { FC, useState } from "react";
import { logout, selectAccount, updateAccount } from "../../../slices/profileSlice";
import { IProfileUpdateParameters } from "../../../util/api";
import { useAppDispatch, useAppSelector, useLocalization } from "../../../util/hooks";
import { getUppy, transformFileData } from "../../../util/uppy";
import { Button } from "../../basic/button/Button";
import { ImageInput } from "../../basic/file/ImageInput";
import { Input } from "../../basic/input/Input";
import { Modal } from "../../basic/modal/Modal";
import { TextArea } from "../../basic/textarea/TextArea";
import styles from "./ProfileEdit.module.scss";

type ProfileEditParameters = {
    opened?: boolean
    onRequestClose?(event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>): void
}

const uppy = getUppy();

export const ProfileEdit: FC<ProfileEditParameters> = ({ opened = false, onRequestClose }) => {
    const lp = useLocalization();
    const dispatch = useAppDispatch();

    const account = useAppSelector(selectAccount);

    const [firstName, setFirstName] = useState(account?.first_name);
    const [secondName, setSecondName] = useState(account?.last_name);
    const [jobTitle, setJobTitle] = useState(account?.job_title);
    const [description, setDescription] = useState(account?.description);

    if (!account) {
        return (
            <Modal className={styles.profileEdit} isOpen={opened} onRequestClose={onRequestClose}>
                NO ACCOUNT!!!
            </Modal>
        )
    }

    return (
        <Modal className={styles.profileEdit} isOpen={opened} onRequestClose={onRequestClose}>
            <div className={styles.header}>
                <div className={styles.title}>
                    {lp("profile_edit_title")}
                </div>
                <div className={styles.logout} onClick={ev => {
                    dispatch(logout());
                    onRequestClose?.(ev);
                }}>
                    {lp("general_logout")}
                </div>
            </div>
            <div className={styles.topBlock}>
                <div className={styles.avatarWrapper}>
                    <ImageInput className={styles.avatar} uppy={uppy} defaultPreviewUrl={account.profile_photo_url}/>
                    <div className={styles.avatarText}>{lp("profile_edit_photo")}</div>
                </div>
                <div className={styles.name}>
                    <Input
                        className={styles.input}
                        label={lp("profile_edit_first_name")}
                        placeholder={lp("profile_edit_first_name_placeholder")}
                        value={firstName}
                        onChange={ev => setFirstName(ev.currentTarget.value)}
                    />
                    <Input
                        className={styles.input}
                        label={lp("profile_edit_second_name")}
                        placeholder={lp("profile_edit_second_name_placeholder")}
                        value={secondName}
                        onChange={ev => setSecondName(ev.currentTarget.value)}
                    />
                </div>
            </div>
            <Input
                className={styles.input}
                label={lp("profile_edit_job_title")}
                placeholder={lp("profile_edit_job_title_placeholder")}
                value={jobTitle}
                onChange={ev => setJobTitle(ev.currentTarget.value)}
            />
            <TextArea
                className={classNames(styles.input, styles.description)}
                label={lp("profile_edit_description")}
                placeholder={lp("profile_edit_description_placeholder")}
                value={description}
                onChange={ev => setDescription(ev.currentTarget.value)}
            />

            <div className={styles.buttons}>
                <Button lightBorder onClick={onRequestClose}>{lp("general_cancel")}</Button>
                <Button color="blue" onClick={async ev => {
                    const params: IProfileUpdateParameters = {...account};
                    params.first_name = firstName;
                    params.last_name = secondName;
                    params.job_title = jobTitle;
                    params.description = description;
                    
                    if(uppy.getFiles().length) {
                        const result = await uppy.upload();
                        if(result.successful.length) {
                            params.profile_photo = transformFileData(result.successful)[0]
                        }

                        // TODO handle errors
                    }

                    dispatch(updateAccount(params));
                    onRequestClose?.(ev);
                }}>{lp("general_save")}</Button>
            </div>
        </Modal>
    )
}