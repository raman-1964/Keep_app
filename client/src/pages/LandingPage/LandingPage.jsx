import React, { useState } from "react";
import Logo from "../../components/Logo/Logo";
import styles from "./LandingPage.module.css";
import MacNotesView from "../../assets/img/LapNotes.png";
import MacChatView from "../../assets/img/LapChat.png";
import MobNotesView from "../../assets/img/MobNotes.png";
import MobChatView from "../../assets/img/MobChat.png";
import FeatureCard from "./components/FeatureCard";
import { FeatureList } from "./components/data";

import DeveloperCard from "./components/DeveloperCard";
import { Developers } from "./components/data";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.AnimationContainer} ${styles.cont1}`}>
          <div className={styles.leftContainer}>
            <h1 className={styles.textSlogan}>
              Enjoy note taking <br /> with your friends
            </h1>
            <p>
              Put down your thoughts in one app, share <br /> with your friends
              and loved ones.
            </p>
            <div className={styles.btnCont}>
              <button className={styles.btn}>Get Started!</button>
              <button className={`${styles.btn} ${styles.signInbtn}`}>
                Sign In
              </button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            {/* <div className={styles.macframeCont}> */}
            <img src={MacNotesView} alt="" className={styles.macframeCont} />
            {/* </div> */}
            {/* <div className={styles.mobileframeCont}> */}
            <img src={MobNotesView} className={styles.mobileframeCont} alt="" />
            {/* </div> */}
          </div>
        </div>

        <div className={`${styles.AnimationContainer} ${styles.cont2}`}>
          <div className={styles.leftContainer}>
            <h1 className={styles.textSlogan}>
              Your Social Hub <br /> for Instant Messaging
            </h1>
            <p>
              Ride the waves of instant connection, <br /> where every message
              tells a story.
            </p>
            <div className={styles.btnCont}>
              <button className={styles.btn}>Get Started!</button>
              <button className={`${styles.btn} ${styles.signInbtn}`}>
                Sign In
              </button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            {/* <div className={styles.macframeCont}> */}
            <img src={MacChatView} alt="" className={styles.macframeCont} />
            {/* </div> */}
            {/* <div className={styles.mobileframeCont}> */}
            <img src={MobChatView} className={styles.mobileframeCont} alt="" />
            {/* </div> */}
          </div>
        </div>

        <div className={styles.featureContainer}>
          <h1>Features</h1>
          <div className={styles.cardContainer}>
            {FeatureList.map((item, index) => (
              <FeatureCard
                src={item.src}
                heading={item.heading}
                txt={item.txt}
              />
            ))}
          </div>
        </div>
        <div className={styles.developerMessegeContainer}>
          <h1>Developers</h1>
          <div className={styles.developerListCont}>
            {Developers.map((item, index) => (
              <DeveloperCard img={item.img} name={item.name} msg={item.msg} linkedin={item.linkedin} />
            ))}
          </div>
        </div>


        <div className={styles.whyguftagu}>
          <h1>Why GUFTAGU?</h1>
          <div className={styles.boxCont}>
            <div className={styles.box}>
              <h3>Simplicity meets Efficiency</h3>
              <p>
                We believe in making communication and organization effortless
                for you.
              </p>
            </div>
            <div className={styles.box}>
              <h3>Seamless Integration</h3>
              <p>
                Our note keeping feature is seamlessly integrated into the
                messaging platform for a unified experience.
              </p>
            </div>
            <div className={styles.box}>
              <h3>Stay Organized & Productive</h3>
              <p>
                No more switching between apps. Keep your conversations and
                notes in one place for maximum productivity.
              </p>
            </div>
            <div className={styles.box}>
              <h3>Your Data, Your Control</h3>
              <p>
                We prioritize your privacy and security, ensuring your
                information remains confidential.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.sloganCont}>
          <h1>
            Connect, Chat, and Keep Notes in one convenient platform. Experience
            a new level of productivity and organization.
          </h1>
          <p>
            Join the <Logo /> Community Today!
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
