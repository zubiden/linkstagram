import { FC, MouseEventHandler } from "react";
import { useLocalization } from "../../../util/hooks";
import { Button } from "../button/Button";
import { Modal } from "./Modal";
import styles from "./Prompt.module.scss";

type PromptParams = {
    opened?: boolean
    text?: string
    danger?: boolean
    onClose?: MouseEventHandler<HTMLElement>
    onConfirm?: MouseEventHandler<HTMLElement>
    onRequestClose?: MouseEventHandler<HTMLElement>
}

export const Prompt: FC<PromptParams> = ({ opened = false, danger = false, text, onClose, onConfirm, onRequestClose }) => {
    const lp = useLocalization();

    return (
        <Modal isOpen={opened} className={styles.prompt} onRequestClose={onRequestClose} mobileExpand={false}>
            <div className={styles.text}>
                {text}
            </div>
            <div className={styles.buttons}>
                <Button color="white" lightBorder onClick={ev => {
                    onClose?.(ev); 
                    onRequestClose?.(ev);
                }}>{lp("general_no")}</Button>
                <Button color={danger ? "red" : "blue"} onClick={onConfirm}>{lp("general_yes")}</Button>
            </div>
        </Modal>
    )
}