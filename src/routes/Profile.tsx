import { FC } from "react";
import { useParams } from "react-router-dom";
import { PostsFeed } from "../components/post/PostsFeed";
import { selectPostsStatus } from "../slices/postsSlice";
import { useAppSelector } from "../util/hooks";

interface ProfileParams {
    username: string
}

const Profile: FC = () => {
    const {username}: ProfileParams = useParams();
    const status = useAppSelector(selectPostsStatus);

    return (
        <>
        Status: {status}
        <PostsFeed username={username}/>
        </>
    )
}

export default Profile;