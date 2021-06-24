import { FC } from "react";
import { Button } from "../../components/basic/button/Button";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Feed } from "../../components/posts/feed/Feed";
import { ProfileInfo } from "../../components/profile/info/ProfileInfo";
import { StoriesSlider } from "../../components/stories/StoriesSlider";
import { selectAccount, selectIsLoggedIn } from "../../slices/profileSlice";
import { IProfile } from "../../types";
import { useAppSelector, useLocalization } from "../../util/hooks";
import styles from "./Home.module.scss";

const Home: FC = () => {
    const lp = useLocalization();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const account = useAppSelector(selectAccount) as IProfile;
    return (
        <div className={styles.home}>
            <Header profile login/>
            <div className={styles.content}>
                <div className={styles.left}>
                    <StoriesSlider/>
                    <Feed/>
                </div>
                <div className={styles.right}>
                    <div className={styles.sticky}>
                        { isLoggedIn ? <ProfileInfo profile={account} own/> :<Button color="black" to="/login">{lp("general_login")}</Button>}
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;