import { FC, useEffect, useState } from "react";
import { checkForNewPosts, fetchAllPosts, selectLoadedPosts, selectNewPostsAvailable, selectPostsStatus } from "../../../slices/postsSlice";
import { useAppDispatch, useAppSelector, useLocalization } from "../../../util/hooks";
import { ModalPost } from "../modal/ModalPost";
import { Post } from "../post/Post";
import { Toast } from "../toast/Toast";
import styles from "./Feed.module.scss";

type FeedParameters = {
    username?: string
}

export const Feed: FC<FeedParameters> = ({ username }) => {
    const dispatch = useAppDispatch();
    const lp = useLocalization();

    useEffect(() => {
        dispatch(fetchAllPosts(username));
    }, [username, dispatch]);

    const [modalPostId, setModalPostId] = useState(-1);
    const [showToast, setShowToast] = useState(false);

    const posts = useAppSelector(selectLoadedPosts);
    const status = useAppSelector(selectPostsStatus);
    const newPostsAvailable = useAppSelector(selectNewPostsAvailable);

    useEffect(() => {
        setShowToast(newPostsAvailable);
    }, [newPostsAvailable]);

    useEffect(() => {
        const id = setInterval(() => {
            dispatch(checkForNewPosts());
        }, 10000);

        return () => clearInterval(id);
    }, [dispatch]);

    let content;

    if (status === "idle") {
        if(posts.length) {
            content = posts.map(post => <Post key={post.id} post={post} onClick={() => {
                setModalPostId(post.id)
            }}/>);
        } else {
            content = <div className={styles.text}>{lp("feed_no_posts")}</div>;
        }
    } else if (status === "loading") {
        content = <div className={styles.text}>{lp("general_loading")}</div>;
    } else {
        content = <div className={styles.text}>{lp("general_error_loading")}</div>;
    }

    return (
        <div className={styles.feed}>
            <Toast 
                className={styles.toast}
                show={showToast} 
                text={lp("feed_new_posts")}
                onClick={() => dispatch(fetchAllPosts(username))} 
                onClose={() => setShowToast(false)}
            />
            {content}
            <ModalPost opened={modalPostId >= 0} postId={modalPostId} onRequestClose={() => setModalPostId(-1)}/>
        </div>
    )
}