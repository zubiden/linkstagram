import classNames from "classnames";
import { FC } from "react";
import { IComment } from "../../../types";
import { getRelativeDateKey } from "../../../util/date";
import { useLocalization } from "../../../util/hooks";
import { insertNewlines } from "../../../util/jsx";
import { Avatar } from "../../basic/avatar/Avatar";
import styles from "./Comment.module.scss";

type CommentParams = {
    comment: IComment
    className?: string
    avatarSize?: string
}

export const Comment: FC<CommentParams> = ({avatarSize="2.5rem", comment, className}) => {
    const lp = useLocalization();

    return (
        <div className={classNames([styles.comment, className])}>
            <Avatar url={comment.commenter.profile_photo_url} size={avatarSize}/>
            <div className={styles.column}>
                <div className={styles.name}>
                    {`${comment.commenter.first_name || ""} ${comment.commenter.last_name || ""}`}
                </div>
                <div className={styles.message}>
                    {insertNewlines(comment.message)}
                </div>
                <div className={styles.time}>
                    {lp(getRelativeDateKey(comment.created_at))}
                </div>
            </div>
        </div>
    )
}