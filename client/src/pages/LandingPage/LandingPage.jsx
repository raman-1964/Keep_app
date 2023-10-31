import React from "react";
import Logo from "../../components/Logo/Logo";
import styles from "./LandingPage.module.css";
import MacFrame from "../../assets/img/macbookFrame.jpg";
import MobileFrame from "../../assets/img/mobileFrame1.jpeg";
import FeatureCard from "./components/FeatureCard";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Logo />
        <div className={styles.navlinks}>
          <span>Features</span>
          <span>Contact Us</span>
          <span>Add more</span>
        </div>
        <div className="loginBtn">Login</div>
      </div>
      <div className={styles.AnimationContainer}>
        <div className={styles.leftContainer}>
          <h1 className={styles.textSlogan}>Enjoy note taking <br /> with your friends</h1>
          <p>
            Put down your thoughts down in one app, share <br /> with your friends and
            loved ones.
          </p>
          <div className={styles.btnCont}>
            <button  className={styles.btn}>Get Started!</button>
            <button className={`${styles.btn} ${styles.signInbtn}`}>Sign In</button>
          </div>
        </div>
        <div className={styles.rightContainer}>
            <div className={styles.macframeCont}>
                <img src={MacFrame} alt="" />
            </div>
            <div className={styles.mobileframeCont}>
                <img src={MobileFrame} alt="" />
            </div>
        </div>
      </div>
      <div className={styles.featureContainer}>
          <h1>Features</h1>
          <div className={styles.cardContainer}>
            <FeatureCard/>
            <FeatureCard/>
            <FeatureCard/>
            <FeatureCard/>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
