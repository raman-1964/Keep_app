import React, { useLayoutEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { ReactComponent as EditPensil } from "../../assets/svg/editPensil.svg";
import { ReactComponent as SettingIcon } from "../../assets/svg/settingIcon.svg";
import { ReactComponent as ChangePasswordIcon } from "../../assets/svg/changePasswordIcon.svg";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import { ReactComponent as Logout } from "../../assets/svg/logout.svg";
import addPeoplesIcon from "../../assets/img/addPeoples.png";
import feedbackIcon from "../../assets/img/feedbackIcon.png";
import HeartIcon from "../../assets/img/heartIcon.png";
import Button from "../../widgets/Button/Button";
import Modal from "../../widgets/Modal/Modal";
import {
  ChangePasswordModal,
  DashboardEditModal,
  FeedbackModal,
  FindPeopleModal,
} from "./components/DashboardModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserRequest,
  userInfoRequest,
} from "../../store/Actions/userAction";
import Spinner from "../../components/Spinner/Spinner";
import DropDown from "../../widgets/DropDown/DropDown";
import { logoutRequest } from "../../store/Actions/loginAction";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import FollowerContainer from "./components/FollowerContainer";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { userDataLoading, userData, deleteUserLoading } = useSelector(
    (state) => state.userReducer
  );

  const [toggle, setToggle] = useState("following");
  const [editModal, setEditModal] = useState(false);
  const [feedbackBool, setFeedbackBool] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [findPeopleModal, setFindPeopleModal] = useState(false);

  useLayoutEffect(() => {
    dispatch(userInfoRequest());
  }, []);

  return (
    <>
      <div className={styles.dashboardContainer}>
        {userDataLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.leftContainer}>
              <div className={styles.userInfoContainer}>
                <div className={styles.userImage}>
                  <img src="" alt="" />
                </div>
                <div className={styles.userInfo}>
                  <p className={styles.uniqueUserName}>{userData.username}</p>
                  <p className={styles.userName}>{userData.name}</p>
                  <p className={styles.userBio}>{userData.bio}</p>
                </div>
              </div>

              <div className={styles.followCountContainer}>
                <Button
                  className={styles.followCard}
                  onClick={() => setToggle("followers")}
                >
                  <h3>{userData?.follwers?.length ?? 0}</h3>
                  <p>Followers</p>
                </Button>
                <Button
                  className={styles.followCard}
                  onClick={() => setToggle("following")}
                >
                  <h3>{userData?.following?.length ?? 0}</h3>
                  <p>Following</p>
                </Button>
              </div>

              <div className={styles.followersListContainer}>
                <p>{toggle}</p>
                {toggle === "following" ? (
                  <FollowerContainer data={userData?.following} />
                ) : (
                  <FollowerContainer data={userData?.follwers} />
                )}
              </div>
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.btnContainer}>
                <Button
                  className={styles.btn}
                  onClick={() => setEditModal(true)}
                >
                  <EditPensil className={styles.svgIcon} />
                  Edit Profile
                </Button>
                <Button
                  className={styles.btn}
                  onClick={() => setFindPeopleModal(true)}
                >
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

                <DropDown
                  right="0"
                  width="12.5rem"
                  btn={
                    <Button className={styles.btn}>
                      <SettingIcon className={styles.svgIcon} />
                      Settings
                    </Button>
                  }
                >
                  <div
                    className={styles.dropDownContent}
                    onClick={() => dispatch(logoutRequest())}
                  >
                    <Logout height="1rem" className={styles.svgIcon} />
                    <h1 className={styles.dropDownContentheading}>Logout</h1>
                  </div>
                  <div
                    className={styles.dropDownContent}
                    onClick={() => setChangePasswordModal(true)}
                  >
                    <ChangePasswordIcon
                      style={{ height: "1rem", transform: "Scale(1.5)" }}
                      className={styles.svgIcon}
                    />
                    <h1 className={styles.dropDownContentheading}>
                      change password
                    </h1>
                  </div>
                  <div
                    className={styles.dropDownContent}
                    onClick={() => setDeleteModal(true)}
                  >
                    <Delete className={styles.svgIcon} />
                    <h1 className={styles.dropDownContentheading}>Delete</h1>
                  </div>
                </DropDown>
              </div>
              <div className={styles.notesContainer}>
                <p>
                  <img src={HeartIcon} alt="" style={{ width: "2rem" }} />
                  Liked Notes
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        onClose={() => setFindPeopleModal(false)}
        isModal={findPeopleModal}
        showCloseButton
        className="modal"
      >
        <FindPeopleModal setModal={setFindPeopleModal} />
      </Modal>

      <Modal
        onClose={() => setEditModal(false)}
        isModal={editModal}
        showCloseButton
        className="modal"
      >
        <DashboardEditModal userInfo={userData} setEditModal={setEditModal} />
      </Modal>

      <Modal
        onClose={() => setDeleteModal(false)}
        isModal={deleteModal}
        showCloseButton
        className="modal"
      >
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deleteLoading={deleteUserLoading}
          title="Are you certain you wish to delete your Account?"
          deleteFunction={() => dispatch(deleteUserRequest({ setDeleteModal }))}
        />
      </Modal>

      <Modal
        onClose={() => setFeedbackBool(false)}
        isModal={feedbackBool}
        showCloseButton
        className="modal"
      >
        <FeedbackModal />
      </Modal>

      <Modal
        onClose={() => setChangePasswordModal(false)}
        isModal={changePasswordModal}
        showCloseButton
        className="modal"
      >
        <ChangePasswordModal setModal={setChangePasswordModal} />
      </Modal>
    </>
  );
};

export default Dashboard;
