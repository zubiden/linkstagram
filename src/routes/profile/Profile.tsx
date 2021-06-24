import { FC, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { PhotoFeed } from "../../components/posts/feed/PhotoFeed";
import { ProfileInfo } from "../../components/profile/info/ProfileInfo";
import { selectAccount } from "../../slices/profileSlice";
import { IProfile } from "../../types";
import { fetchProfile } from "../../util/api";
import { IS_DESKTOP } from "../../util/contants";
import { useAppSelector, useWindowSize } from "../../util/hooks";
import styles from "./Profile.module.scss";

const OwnProfile: FC = () => {
    let { username } = useParams<{username: string}>();
    const account = useAppSelector(selectAccount) as IProfile;
    useWindowSize(); //update on resize

    const [profile, setProfile] = useState<IProfile | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (username) {
            if(!profile || profile.username !== username) fetchProfile(username).then(json => setProfile(json)).catch(ex => setError("Failed to get profile"));
        } else {
            setProfile(account);
        }
    }, [username, account, profile]);

    if (!username && !localStorage.getItem("auth")) {
        return <Redirect to="/login" />
    }

    const own = !!profile && account?.username === profile.username;

    return (
        <div className={styles.ownProfile}>
            <Header home profile={!own}/>
            <div className={styles.content}>
                {error ? error : !profile ? "Failed to load profile" :
                    <>
                        <ProfileInfo profile={profile} own={own} horizontal={IS_DESKTOP()} />
                        <PhotoFeed username={profile.username} />
                    </>
                }
            </div>
        </div>
    )
}

export default OwnProfile;