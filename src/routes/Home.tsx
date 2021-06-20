import { FC } from "react";
import { Button } from "../components/basic/Button";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PostsFeed } from "../components/post/PostsFeed";
import { ProfileInfo } from "../components/ProfileInfo";
import { StoriesSlider } from "../components/StoriesSlider";
import { selectAccount, selectIsLoggedIn } from "../slices/profileSlice";
import { IProfile } from "../types";
import { useAppSelector } from "../util/hooks";
import styles from "./Home.module.scss";

const Home: FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const account = useAppSelector(selectAccount) as IProfile;
    return (
        <div className={styles.home}>
            <Header home profile/>
            <div className={styles.content}>
                <div className={styles.left}>
                    <StoriesSlider/>
                    <PostsFeed/>
                </div>
                <div className={styles.right}>
                    { isLoggedIn ? <ProfileInfo profile={account} own/> :<Button color="black" to="/login">Login</Button>}
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Home;