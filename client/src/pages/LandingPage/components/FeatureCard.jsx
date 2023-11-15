import React from "react";
import styles from "./FeatureCard.module.css";
import shareFeatureIcon from "../../../assets/svg/shareFeatureIcon.svg";
// props== img,heading,para

const FeatureCard = () => {
  return (
    <div className={styles.Card}>
      <div className={styles.featureImg}>
        <img src={shareFeatureIcon} alt="this is an img" />
      </div>
      <h3 className={styles.cardHeading}>Share Notes with Friends</h3>
      <p className={styles.cardPara}>
        Share notes with friends Whether you have a team of 2 or 200, our shared
        team inboxes keep everyone on the same page and in the loop.
      </p>
    </div>
  );
};

export default FeatureCard;
