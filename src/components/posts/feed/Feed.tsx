import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllPosts, selectLoadedPosts, selectPostsStatus } from "../../../slices/postsSlice";
import { useAppDispatch, useLocalization } from "../../../util/hooks";
import { Post } from "../post/Post";
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

    const posts = useSelector(selectLoadedPosts);
    const status = useSelector(selectPostsStatus);

    let content;

    if (status === "idle") {
        if(posts.length) {
            content = posts.map(post => <Post key={post.id} post={post} />);
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
            <div className={styles.postList}>
                {content}
            </div>
        </div>
    )
}