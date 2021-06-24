import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllPosts, selectLoadedPosts, selectPostsStatus } from "../../../slices/postsSlice";
import { useAppDispatch, useLocalization } from "../../../util/hooks";
import styles from "./PhotoFeed.module.scss";

type PhotoFeedParameters = {
    username?: string
}

export const PhotoFeed: FC<PhotoFeedParameters> = ({username}) => {
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
            content = posts.map(post => post.photos).flat(1).map(photo => <ImageSquare key={photo.id} url={photo.url}/>);
        } else {
            content = <div className={styles.text}>{lp("feed_no_posts")}</div>;
        }
    } else if (status === "loading") {
        content = lp("general_loading");
    } else {
        content = lp("general_error_loading");
    }

    return (
        <div className={styles.photoFeed}>
            {content}
        </div>
    )
}

const ImageSquare: FC<{url: string}> = ({url}) => {
    return <div className={styles.square} style={{backgroundImage: `url(${url})`}}/>
}