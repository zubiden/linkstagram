import { FC, MouseEventHandler, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllPosts, selectLoadedPosts, selectPostsStatus } from "../../../slices/postsSlice";
import { useAppDispatch, useLocalization } from "../../../util/hooks";
import { ModalPost } from "../modal/ModalPost";
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
    
    const [modalPostId, setModalPostId] = useState(-1);

    const posts = useSelector(selectLoadedPosts);
    const status = useSelector(selectPostsStatus);

    let content;
    if (status === "idle") {
        if(posts.length) {
            content = posts.map(post => post.photos.map(photo => <ImageSquare key={photo.id} url={photo.url} onClick={() => setModalPostId(post.id)}/>)).flat(1);
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
            <ModalPost opened={modalPostId >= 0} postId={modalPostId} onRequestClose={() => setModalPostId(-1)}/>
        </div>
    )
}

const ImageSquare: FC<{url: string, onClick?: MouseEventHandler<HTMLElement>}> = ({url, onClick}) => {
    return <div className={styles.square} onClick={onClick} style={{backgroundImage: `url(${url})`}}/>
}