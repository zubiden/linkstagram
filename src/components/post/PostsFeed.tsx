import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllPosts, selectLoadedPosts } from "../../slices/postsSlice";
import { useAppDispatch } from "../../util/hooks";
import { FeedPost } from "./FeedPost";
import styles from "./PostsFeed.module.scss";

type PostsFeedParameters = {
    username?: string
}

export const PostsFeed: FC<PostsFeedParameters> = ({username}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllPosts(username));
    }, [username, dispatch]);

    const posts = useSelector(selectLoadedPosts);

    return (
        <div className={styles.feed}>
            <div className={styles.postList}>
                {posts.map(post => <FeedPost key={post.id} post={post}/>)}
            </div>
        </div>
    )
}