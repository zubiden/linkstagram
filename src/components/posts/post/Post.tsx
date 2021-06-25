import { FC, MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";
import { deleteOwnPost, dislikePost, likePost } from "../../../slices/postsSlice";
import { selectAccount } from "../../../slices/profileSlice";
import { IPost } from "../../../types";
import { copyTextToClipboard } from "../../../util/clipboard";
import { BASE_URL } from "../../../util/contants";
import { getRelativeDateKey } from "../../../util/date";
import { useAppDispatch, useAppSelector, useAuthorization, useLocalization } from "../../../util/hooks";
import { insertNewlines } from "../../../util/jsx";
import { Avatar } from "../../basic/avatar/Avatar";
import { IconButton } from "../../basic/button/IconButton";
import styles from "./Post.module.scss";

type PostProps = {
    post: IPost
    onImageClicked?: MouseEventHandler<HTMLElement>
}

export const Post: FC<PostProps> = ({post, onImageClicked}) => {
    const lp = useLocalization();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const account = useAppSelector(selectAccount);
    const requireAuth = useAuthorization();

    return (
        <div className={styles.post}>
            <div className={styles.header}>
                <Avatar url={post.author.profile_photo_url} size={"2.5em"} to={`/profile/${post.author.username}`}/>
                <div className={styles.info}>
                    <div className={styles.name}>
                        { `${post.author.first_name || ""} ${post.author.last_name || ""}`}
                    </div>
                    <div className={styles.time}>
                        {lp(getRelativeDateKey(post.created_at))}
                    </div>
                </div>
                <div className={styles.more}  onClick={() => {
                    if(account?.username === post.author.username) {
                        dispatch(deleteOwnPost(post.id));
                    }
                }}>
                    <i className="icon icon-more"/>
                </div>
            </div>
            <div className={styles.content}>
                {!!post.photos.length && <div className={styles.square}>
                    <img src={post.photos[0].url} className={styles.image} alt="Post content" onClick={onImageClicked}/>
                </div>}
                {post.description && <div className={styles.description}>{insertNewlines(post.description)}</div>}
            </div>
            <div className={styles.footer}>
                <IconButton 
                    className={styles.iconButton} 
                    icon="like" text={post.likes_count.toString()} 
                    checked={post.is_liked} 
                    onClick={() => requireAuth(() => dispatch(post.is_liked ? dislikePost(post.id) : likePost(post.id)))}
                />
                <IconButton className={styles.iconButton} icon="comments" text="0" onClick={() => history.push(`/${post.id}`)}/>
                <div className={styles.separator}/>
                <div className={styles.share} onClick={() => copyTextToClipboard(BASE_URL+"#/"+post.id)}>{lp("post_share")} <i className="icon icon-arrow"/></div>
            </div>
        </div>
    )
}
