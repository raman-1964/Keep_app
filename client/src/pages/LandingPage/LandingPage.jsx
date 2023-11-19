import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./LandingPage.module.css";
import Logo from "../../components/Logo/Logo";
import MacNotesView from "../../assets/img/LapNotes.png";
import MacChatView from "../../assets/img/LapChat.png";
import MobNotesView from "../../assets/img/MobNotes.png";
import MobChatView from "../../assets/img/MobChat.png";
import FeatureCard from "./components/FeatureCard";
import { FeatureList } from "./components/data";
import DeveloperCard from "./components/DeveloperCard";
import { Developers } from "./components/data";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.container} scrollbar`}>
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
              <button
                className={styles.btn}
                onClick={() => navigate("/login-signup")}
              >
                Get Started !
              </button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <img src={MacNotesView} alt="" className={styles.macframeCont} />
            <img src={MobNotesView} className={styles.mobileframeCont} alt="" />
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
          </div>
          <div className={styles.rightContainer}>
            <img src={MacChatView} alt="" className={styles.macframeCont} />
            <img src={MobChatView} className={styles.mobileframeCont} alt="" />
          </div>
        </div>

        <div className={styles.cardContainer}>
          <h1>Features</h1>
          <div className={styles.featureCardContainer}>
            {FeatureList.map((item, index) => (
              <FeatureCard
                key={index}
                src={item.src}
                heading={item.heading}
                txt={item.txt}
              />
            ))}
          </div>
        </div>

        <div className={`${styles.cardContainer} ${styles.mt5}`}>
          <h1>Developers</h1>
          <div className={styles.developerCardContainer}>
            {Developers.map((item, index) => (
              <DeveloperCard
                key={index}
                img={item.img}
                name={item.name}
                linkedin={item.linkedin}
                role={item.role}
              />
            ))}
          </div>
        </div>

        <div className={styles.whyguftagu}>
          <h1>Why Guftagu?</h1>
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

        <h1 className={styles.slogan}>
          Connect, Chat, and Keep Notes in one convenient platform. Experience a
          new level of productivity and organization.
        </h1>
        <div
          className={styles.community}
          onClick={() => navigate("/login-signup")}
        >
          <p>Join the</p>
          <Logo />
          <p>Community Today!</p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
