import classNames from "classnames";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { closePost, leaveOwnComment, openPost, selectOpenedComments, selectOpenedPost } from "../../../slices/openedPostSlice";
import { dislikePost, likePost, selectPostsStatus } from "../../../slices/postsSlice";
import { IComment, IPost } from "../../../types";
import { IS_DESKTOP } from "../../../util/contants";
import { getRelativeDateKey } from "../../../util/date";
import { useAppDispatch, useAppSelector, useAuthorization, useLocalization, useWindowSize } from "../../../util/hooks";
import { insertNewlines } from "../../../util/jsx";
import { Avatar } from "../../basic/avatar/Avatar";
import { IconButton } from "../../basic/button/IconButton";
import { Modal } from "../../basic/modal/Modal";
import { TextArea } from "../../basic/textarea/TextArea";
import { Header } from "../../header/Header";
import { Slider } from "../../slider/Slider";
import { Comment } from "../comment/Comment";
import { Post } from "../post/Post";
import styles from "./ModalPost.module.scss";

type ModalPostParams = {
    opened?: boolean
    postId?: number
    onRequestClose?: MouseEventHandler<HTMLElement>
}

export const ModalPost: FC<ModalPostParams> = ({ postId = -1, opened = false, onRequestClose }) => {
    const lp = useLocalization();
    const dispatch = useAppDispatch();
    useWindowSize();

    const post = useAppSelector(selectOpenedPost);
    const postStatus = useAppSelector(selectPostsStatus);
    const comments = useAppSelector(selectOpenedComments);

    useEffect(() => {
        if (postId >= 0) {
            dispatch(openPost(postId));
        } else {
            dispatch(closePost()); // don't keep last post loaded in store
        }
    }, [dispatch, postId]);

    let content;

    if (!post) {
        if (postStatus === "loading") {
            content = lp("general_loading");
        } else {
            content = lp("general_error_loading");
        }
    } else {
        // designer decided that mobile will use standard post with comments, but not desktop
        if (!IS_DESKTOP()) {
            content = (
                <>
                    <Header back onBackClick={onRequestClose} />
                    <Post post={post} sliderSides fullDescription />
                    <Comments post={post} comments={comments} />
                </>
            )
        } else {
            content = (
                <>
                    {post.photos.length ?
                        <Slider photos={post.photos} className={styles.slider} />
                        : <div className={styles.noImages}><span>{lp("post_no_images")}</span></div>}
                    <div className={styles.data}>
                        <div className={styles.header}>
                            <Avatar className={styles.avatar} url={post.author.profile_photo_url} size="3rem" />
                            <div className={styles.left}>
                                <div className={styles.name}>{`${post.author.first_name || ""} ${post.author.last_name || ""}`}</div>
                                <div className={styles.date}>{lp(getRelativeDateKey(post.created_at))}</div>
                            </div>
                            <div className={styles.separator} />
                            <i className={`icon icon-cross ${styles.close}`} onClick={onRequestClose} />
                        </div>
                        <div className={styles.description}>
                            {insertNewlines(post.description)}
                        </div>
                        <Comments post={post} comments={comments} likes padding />
                    </div>
                </>
            )
        }
    }

    return (
        <Modal isOpen={opened} className={styles.modalPost} onRequestClose={onRequestClose} tabletExpand>
            {content}
        </Modal>
    )
}

type CommentsProps = {
    comments: IComment[]
    post: IPost
    likes?: boolean
    padding?: boolean
}

const Comments: FC<CommentsProps> = ({ comments, post, likes = false, padding = false }) => {
    const lp = useLocalization();
    const dispatch = useAppDispatch();
    const requireAuth = useAuthorization();

    const [comment, setComment] = useState("");

    return (
        <>
            <div className={classNames({
                [styles.comments]: true,
                [styles.padding]: padding
            })}>
                {comments.length ? comments.map(comment => <Comment avatarSize="3rem" className={styles.comment} comment={comment} key={comment.id} />) : lp("post_no_comments")}
            </div>
            {likes && <div className={styles.buttons}>
                <IconButton
                    icon="like"
                    text={post.likes_count.toString()}
                    className={styles.like}
                    checked={post.is_liked}
                    onClick={() => requireAuth(() => post.is_liked ? dispatch(dislikePost(post.id)) : dispatch(likePost(post.id)))}
                />
            </div>}
            <div className={styles.newComment}>
                <TextArea
                    minRows={1}
                    className={styles.input}
                    placeholder={lp("post_add_comment")}
                    value={comment}
                    onChange={ev => setComment(ev.currentTarget.value)}
                />
                <button className={styles.post} onClick={() => requireAuth(() => {
                    dispatch(leaveOwnComment({ post_id: post.id, message: comment }));
                    setComment("");
                })}>{lp("post_post_comment")}</button>
            </div>
        </>
    )
}