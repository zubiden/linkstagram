import { FC, MouseEventHandler, useEffect, useState } from "react";
import { Item, Menu, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
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
import { Prompt } from "../../basic/modal/Prompt";
import { Slider } from "../../slider/Slider";
import styles from "./Post.module.scss";

type PostProps = {
    post: IPost
    sliderSides?: boolean
    onClick?: MouseEventHandler<HTMLElement>
}

export const Post: FC<PostProps> = ({ post, sliderSides, onClick }) => {
    const lp = useLocalization();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const [deletePrompt, setDeletePrompt] = useState(false);
    const [shared, setShared] = useState(false);

    useEffect(() => {
        let id: NodeJS.Timeout;
        if(shared) {
           id = setTimeout(() => setShared(false), 2000);
        }
        return () => clearTimeout(id);
    }, [shared])

    const { show } = useContextMenu({
        id: post.id,
    });

    const account = useAppSelector(selectAccount);
    const requireAuth = useAuthorization();

    const copyLink = () => {
        copyTextToClipboard(BASE_URL + "#/" + post.id);
        setShared(true);
    }

    return (
        <div className={styles.post}>
            <div className={styles.header}>
                <Avatar url={post.author.profile_photo_url} size={"2.5em"} to={`/profile/${post.author.username}`} />
                <div className={styles.info}>
                    <div className={styles.name}>
                        {`${post.author.first_name || ""} ${post.author.last_name || ""}`}
                    </div>
                    <div className={styles.time}>
                        {lp(getRelativeDateKey(post.created_at))}
                    </div>
                </div>
                <div className={styles.more} onClick={ev => show(ev)}>
                    <i className="icon icon-more" />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.sliderOverlay}>
                    {!!post.photos.length && <Slider
                                                className={styles.slider}
                                                photos={post.photos}
                                                onCenterClick={onClick}
                                                sides={sliderSides}
                                                roundBorders/>}
                    {shared && <div className={styles.shared}><span>{lp("post_copied")}</span></div>}
                </div>
                {post.description && <div className={styles.description} onClick={onClick}>{insertNewlines(post.description)}</div>}
            </div>
            <div className={styles.footer}>
                <IconButton
                    className={styles.iconButton}
                    icon="like" text={post.likes_count.toString()}
                    checked={post.is_liked}
                    onClick={() => requireAuth(() => dispatch(post.is_liked ? dislikePost(post.id) : likePost(post.id)))}
                />
                <IconButton className={styles.iconButton} icon="comments" text="0" onClick={() => history.push(`/${post.id}`)} />
                <div className={styles.separator} />
                <div className={styles.share} onClick={copyLink}>{lp("post_share")} <i className="icon icon-arrow" /></div>
            </div>

            <Menu id={post.id}>
                <Item onClick={copyLink}>{lp("post_copy_link")}</Item>
                {account?.username === post.author.username &&
                    <Item className={styles.danger} onClick={() => setDeletePrompt(true)}>{lp("post_delete")}</Item>}
            </Menu>

            {deletePrompt && <Prompt
                text={lp("post_delete_confirm")}
                danger
                opened={deletePrompt}
                onConfirm={() => dispatch(deleteOwnPost(post.id))}
                onRequestClose={() => setDeletePrompt(false)}
            />}
        </div>
    )
}
