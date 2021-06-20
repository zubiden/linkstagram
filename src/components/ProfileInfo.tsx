import { FC } from "react";
import { IProfile } from "../types";
import { useLocalization } from "../util/hooks";
import { Avatar } from "./basic/Avatar";
import { Button } from "./basic/Button";
import styles from "./ProfileInfo.module.scss";

export const ProfileInfo: FC<{profile: IProfile, own?: boolean}> = ({profile, own = false}) => {
    const lp = useLocalization();

    return (
        <div className={styles.profileInfo}>
            <div className={styles.top}>
                <div className={styles.followers}>
                    <div className={styles.number}>{profile.followers}</div>
                    <div className={styles.smallText}>{lp("profile_followers")}</div>
                </div>
                <Avatar url={profile.profile_photo_url} border size="5em"/>
                <div className={styles.following}>
                    <div className={styles.number}>{profile.following}</div>
                    <div className={styles.smallText}>{lp("profile_following")}</div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.info}>
                    {`${profile.first_name} ${profile.last_name} - ${profile.job_title}`}
                </div>
                <div className={styles.description}>
                    {profile.description}
                </div>
                {own && <div className={styles.actionButtons}>
                    <Button smallPadding>{lp("profile_edit")}</Button>
                    <Button smallPadding color="blue">{lp("post_new")}</Button>
                </div>}
            </div>
        </div>
    )
}