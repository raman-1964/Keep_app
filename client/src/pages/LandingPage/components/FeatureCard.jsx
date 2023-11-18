import React from "react";
import styles from "./FeatureCard.module.css";

const FeatureCard = ({ src, heading, txt }) => {
  return (
    <div className={styles.Card}>
      <div className={styles.featureImg}>
        <img src={src} alt="this is an img" />
      </div>
      <h3 className={styles.cardHeading}>{heading}</h3>
      <p className={styles.cardPara}>{txt}</p>
    </div>
  );
};

export default FeatureCard;
