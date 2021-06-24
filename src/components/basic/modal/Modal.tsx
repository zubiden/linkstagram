import classNames from "classnames";
import { FC } from "react";
import ReactModal from "react-modal";
import styles from "./Modal.module.scss";

type ModalParameters = {
    isOpen: boolean
    className?: string
    onRequestClose?(event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>): void
}

export const Modal: FC<ModalParameters> = ({isOpen, onRequestClose, className, children}) => {
    return (
        <ReactModal className={classNames(styles.modal, className)} overlayClassName={styles.overlay} isOpen={isOpen} onRequestClose={onRequestClose}>
            {children}
        </ReactModal>
    )
}