import classNames from "classnames";
import { FC, useState } from "react";
import { IProfile } from "../../../types";
import { useAuthorization, useLocalization } from "../../../util/hooks";
import { insertNewlines } from "../../../util/jsx";
import { Avatar } from "../../basic/avatar/Avatar";
import { Button } from "../../basic/button/Button";
import { NewPost } from "../../posts/new/NewPost";
import { ProfileEdit } from "../edit/ProfileEdit";
import styles from "./ProfileInfo.module.scss";

type ProfileInfoProps = {
    profile: IProfile
    own?: boolean
    horizontal?: boolean
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ profile, own = false, horizontal = false }) => {
    const lp = useLocalization();
    const requireAuth = useAuthorization();

    const [isNewPostOpened, setNewPostOpened] = useState(false);
    const [isProfileEditOpened, setProfileEditOpened] = useState(false);

    const nameString = `${profile.first_name || ""} ${profile.last_name || ""}`;
    if (horizontal) {
        return (
            <div className={classNames([styles.profileInfo, styles.horizontal])}>
                <div className={styles.avatar}>
                    <Avatar url={profile.profile_photo_url} border size="7.25em" />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>
                        {nameString}
                    </div>
                    <div className={styles.job}>
                        {profile.job_title || ""}
                    </div>
                    <div className={styles.description}>
                        {insertNewlines(profile.description || "")}
                    </div>
                </div>
                <div className={styles.separator} />
                <div className={styles.right}>
                    <div className={styles.social}>
                        <div className={styles.followers}>
                            <div className={styles.number}>{profile.followers}</div>
                            <div className={styles.smallText}>{lp("profile_followers", {}, profile.followers)}</div>
                        </div>

                        <div className={styles.following}>
                            <div className={styles.number}>{profile.following}</div>
                            <div className={styles.smallText}>{lp("profile_following")}</div>
                        </div>
                    </div>
                    {own && <div className={styles.actionButtons}>
                        <Button smallPadding lightBorder onClick={() => requireAuth(() => setProfileEditOpened(true))}>{lp("profile_edit")}</Button>
                        <Button smallPadding color="blue" onClick={() => requireAuth(() => setNewPostOpened(true))}>{lp("post_new")}</Button>
                    </div>}
                </div>
                <NewPost opened={isNewPostOpened} onRequestClose={() => setNewPostOpened(false)} />
                <ProfileEdit opened={isProfileEditOpened} onRequestClose={() => setProfileEditOpened(false)} />
            </div>
        )
    }

    return (
        <div className={styles.profileInfo}>
            <div className={styles.top}>
                <div className={styles.followers}>
                    <div className={styles.number}>{profile.followers}</div>
                    <div className={styles.smallText}>{lp("profile_followers", {}, profile.followers)}</div>
                </div>
                <div className={styles.avatar}>
                    <Avatar url={profile.profile_photo_url} border size="5em" />
                    {own && <i className={`icon icon-add ${styles.add}`} />}
                </div>
                <div className={styles.following}>
                    <div className={styles.number}>{profile.following}</div>
                    <div className={styles.smallText}>{lp("profile_following")}</div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.info}>
                    {nameString} {profile.job_title ? `- ${profile.job_title || ""}` : ""}
                </div>
                <div className={styles.description}>
                    {insertNewlines(profile.description || "")}
                </div>
                {own && <div className={styles.actionButtons}>
                    <Button smallPadding onClick={() => requireAuth(() => setProfileEditOpened(true))}>{lp("profile_edit")}</Button>
                    <Button smallPadding color="blue" onClick={() => requireAuth(() => setNewPostOpened(true))}>{lp("post_new")}</Button>
                </div>}
            </div>
            <NewPost opened={isNewPostOpened} onRequestClose={() => setNewPostOpened(false)} />
            <ProfileEdit opened={isProfileEditOpened} onRequestClose={() => setProfileEditOpened(false)} />
        </div>
    )
}