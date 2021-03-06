import { FC, useEffect } from "react";
import { fetchAllProfiles, selectProfiles } from "../../slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import { Avatar } from "../basic/avatar/Avatar";
import styles from "./Stories.module.scss";

export const Stories: FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProfiles());
    }, [dispatch]);

    const profiles = useAppSelector(selectProfiles);

    return (
        <div className={styles.stories}>
            <div className={styles.scroll}>
                {profiles.filter(profile => profile.profile_photo_url).map(profile => <Avatar
                    key={profile.username}
                    url={profile.profile_photo_url}
                    size={"4em"}
                    to={`/profile/${profile.username}`}
                    border />)}
            </div>
        </div>
    )
}