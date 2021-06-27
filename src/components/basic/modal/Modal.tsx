import classNames from "classnames";
import { FC, MouseEventHandler } from "react";
import ReactModal from "react-modal";
import styles from "./Modal.module.scss";

type ModalParameters = {
    isOpen: boolean
    className?: string
    tabletExpand?: boolean
    mobileExpand?: boolean
    onRequestClose?: MouseEventHandler<HTMLElement>
}

export const Modal: FC<ModalParameters> = ({isOpen, onRequestClose, className, tabletExpand = false, mobileExpand = true, children}) => {
    return (
        <ReactModal 
            className={classNames({
                [styles.modal]: true,
                [styles.tabletExpand]: tabletExpand,
                [styles.mobileExpand]: mobileExpand
            }, className)} 
            overlayClassName={styles.overlay} 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
        >
            {children}
        </ReactModal>
    )
}