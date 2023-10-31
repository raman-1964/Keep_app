import React from "react";
import Logo from "../../components/Logo/Logo";
import styles from "./LandingPage.module.css";
import MacFrame from "../../assets/img/macbookFrame.jpg";
import MobileFrame from "../../assets/img/mobileFrame1.jpeg";

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
          <h1>Enjoy note taking <br /> with your friends</h1>
          <p>
            Put down your thoughts down in one app, share <br /> with your friends and
            loved ones.
          </p>
          <div className={styles.btnCont}>
            <button>Get Started!</button>
            <button>Sign In</button>
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
    </div>
  );
};

export default LandingPage;
