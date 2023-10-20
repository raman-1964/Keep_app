import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { ReactComponent as EditPensil } from "../../assets/svg/editPensil.svg";
import { ReactComponent as SettingIcon } from "../../assets/svg/settingIcon.svg";
import { ReactComponent as ChangePasswordIcon } from "../../assets/svg/changePasswordIcon.svg";
import addPeoplesIcon from "../../assets/img/addPeoples.png";
import feedbackIcon from "../../assets/img/feedbackIcon.png";
import ChatIcon from "../../assets/img/chatIcon.png";
import HeartIcon from "../../assets/img/heartIcon.png";
import DeleteAccountIcon from "../../assets/img/deleteAccountIcon.png";
import Button from "../../widgets/Button/Button";
import Modal from "../../widgets/Modal/Modal";
import {
  DashboardEditModal,
  FeedbackModal,
  FindPeopleModal,
} from "./components/DashboardModal";

const Dashboard = () => {
  const [toggle, setToggle] = useState("Following");
  const [editModal, setEditModal] = useState(false);
  const [feedbackBool, setFeedbackBool] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "Sachin Jaluthariya",
    username: "_sumt_",
    userbio: "Computer Science and Engineering,JNU",
  });

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.userInfoContainer}>
            <Button
              className={`${styles.btn} ${styles.settingbtn}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <SettingIcon className={styles.svgIcon} />
            </Button>
            {showDropdown ? (
              <div className={styles.dropdown}>
                <Button
                  className={styles.btn}
                  onClick={() => setEditModal(true)}
                >
                  <EditPensil className={styles.svgIcon} />
                  Edit Profile
                </Button>

                <Button className={styles.btn}>
                  <ChangePasswordIcon className={styles.svgIcon} />
                  Change Password
                </Button>

                <Button className={styles.btn}>
                  <img src={DeleteAccountIcon} className={styles.svgIcon} />
                  Delete Account
                </Button>
              </div>
            ) : null}

            <div className={styles.userImage}>
              <img src="" alt="" />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{userInfo.name}</div>
              <div className={styles.uniqueUserName}>{userInfo.username}</div>
              <div className={styles.userBio}>{userInfo.userbio}</div>
            </div>
          </div>

          <div className={styles.followCountContainer}>
            <Button
              className={styles.followerCard}
              onClick={() => setToggle("Followers")}
            >
              <h3>120</h3>
              <p>Followers</p>
            </Button>
            <Button
              className={styles.followingCard}
              onClick={() => setToggle("Following")}
            >
              <h3>420</h3>
              <p>Following</p>
            </Button>
          </div>

          <div className={styles.followersListContainer}>
            <p>{toggle}</p>
            <div className={styles.followersList}>
              {[...Array(9).keys()].map(() => (
                <div className={styles.follower}>
                  <div className={styles.wrapper}>
                    <div className={styles.followerImg}>
                      <img src="" alt="" />
                    </div>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>Sachin Jaluthariya</div>
                      <div className={styles.uniqueUserName}>_sumit_</div>
                    </div>
                  </div>
                  <div className={styles.wrapper}>
                    <Button className={styles.btn}>following</Button>
                    <div className={styles.followerImg}>
                      <img
                        src={ChatIcon}
                        alt=""
                        style={{
                          width: "1.8rem",
                          height: "1.8rem",
                          border: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.btnContainer}>
            <Button className={styles.btn} onClick={() => setEditModal(true)}>
              <EditPensil className={styles.svgIcon} />
              Edit Profile
            </Button>
            <Button className={styles.btn}>
              <img src={addPeoplesIcon} alt="" className={styles.svgIcon} />
              Find Peoples
            </Button>
            <Button
              className={styles.btn}
              onClick={() => setFeedbackBool(true)}
            >
              <img src={feedbackIcon} alt="" className={styles.svgIcon} />
              Feedback
            </Button>
            <Button
              className={styles.btn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <SettingIcon className={styles.svgIcon} />
              Settings
            </Button>
          </div>
          <div className={styles.notesContainer}>
            <p>
              <img src={HeartIcon} alt="" style={{ width: "2rem" }} />
              Liked Notes
            </p>
          </div>
        </div>
      </div>

      <Modal
        onClose={() => setEditModal(false)}
        isModal={editModal}
        showCloseButton
        className="modal"
      >
        <DashboardEditModal userInfo={userInfo} setUserInfo={setUserInfo} />
      </Modal>

      <Modal
        onClose={() => setFeedbackBool(false)}
        isModal={feedbackBool}
        showCloseButton
        className="modal"
      >
        <FeedbackModal />
      </Modal>
    </>
  );
};

export default Dashboard;
