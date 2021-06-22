import { FC, useEffect } from "react";
import { fetchAllProfiles, selectProfiles } from "../slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../util/hooks";
import { Avatar } from "./basic/Avatar";
import styles from "./StoriesSlider.module.scss";

export const StoriesSlider: FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProfiles());
    }, [dispatch]);

    const profiles = useAppSelector(selectProfiles);

    return (
        <div className={styles.slider}>
            {profiles/*.filter(profile => profile.profile_photo_url)*/.map(profile => <Avatar key={profile.username} url={profile.profile_photo_url} size={"4em"} border/>)}
        </div>
    )
} 