import classNames from "classnames";
import { FC } from "react";
import { deleteOwnPost, dislikePost, likePost } from "../../slices/postsSlice";
import { selectAccount } from "../../slices/profileSlice";
import { IPost } from "../../types";
import { getRelativeDateKey } from "../../util/date";
import { useAppDispatch, useAppSelector, useLocalization } from "../../util/hooks";
import { Avatar } from "../basic/Avatar";
import styles from "./FeedPost.module.scss";

type PostProps = {
    post: IPost
}

export const FeedPost: FC<PostProps> = ({post}) => {
    const lp = useLocalization();
    const dispatch = useAppDispatch();
    const account = useAppSelector(selectAccount);

    return (
        <div className={styles.post}>
            <div className={styles.header}>
                <Avatar url={post.author.profile_photo_url} size={"2.5em"}/>
                <div className={styles.info}>
                    <div className={styles.name}>
                        { `${post.author.first_name} ${post.author.last_name}`}
                    </div>
                    <div className={styles.time}>
                        {lp(getRelativeDateKey(post.created_at, Date.now()))}
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
                    <img src={post.photos[0].url} className={styles.image} alt="Post content"/>
                </div>}
                {post.description && <div className={styles.description}>{post.description}</div>}
            </div>
            <div className={styles.footer}>
                <IconText icon="like" text={post.likes_count.toString()} liked={post.is_liked} onClick={() => dispatch(post.is_liked ? dislikePost(post.id) : likePost(post.id))}/>
                <IconText icon="comments" text="0"/>
                <div className={styles.separator}/>
                <div className={styles.share}>{lp("post_share")} <i className="icon icon-arrow"/></div>
            </div>
        </div>
    )
}

type IconTextParameters = {
    icon: string
    text: string
    liked?: boolean
    onClick?: React.MouseEventHandler<HTMLSpanElement>
}

const IconText: FC<IconTextParameters> = ({icon, text, liked = false, onClick}) => {
    return (
        <span className={styles.iconText} onClick={onClick}>
            <i className={classNames({
                "icon": true,
                [`icon-${icon}`]: true,
                [styles.liked]: liked
            })
            }/>
            <span className={styles.text}>{text}</span>
        </span>
    )
}