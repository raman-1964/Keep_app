import React, { useLayoutEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { ReactComponent as EditPensil } from "../../assets/svg/editPensil.svg";
import { ReactComponent as SettingIcon } from "../../assets/svg/settingIcon.svg";
import { ReactComponent as ChangePasswordIcon } from "../../assets/svg/changePasswordIcon.svg";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import { ReactComponent as Logout } from "../../assets/svg/logout.svg";
import { ReactComponent as UpArrow } from "../../assets/svg/up-arrow.svg";
import { ReactComponent as Profile } from "../../assets/svg/profile.svg";
import addPeoplesIcon from "../../assets/img/addPeoples.png";
import feedbackIcon from "../../assets/img/feedbackIcon.png";
import HeartIcon from "../../assets/img/heartIcon.png";
import Button from "../../widgets/Button/Button";
import Modal from "../../widgets/Modal/Modal";
import {
  ChangePasswordModal,
  ChangePhotoModal,
  DashboardEditModal,
  FeedbackModal,
  FindPeopleModal,
  ViewPhotoModal,
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
import { getLikeNoteRequest } from "../../store/Actions/noteAction";
import { folderType } from "../../utils/constants";
import NoteContainer from "../../components/NoteContainer/NoteContainer";
import { useWindowDimension } from "../../components/CustomHooks/CustomHooks";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userDataLoading, userData, deleteUserLoading } = useSelector(
    (state) => state.userReducer
  );
  const { likedNotes, getLikedNoteLoading } = useSelector(
    (state) => state.noteReducer
  );

  const { dimensions } = useWindowDimension();

  const [toggle, setToggle] = useState("Following");
  const [fldType, setFldType] = useState(folderType.PRS);
  const [editModal, setEditModal] = useState(false);
  const [feedbackBool, setFeedbackBool] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [findPeopleModal, setFindPeopleModal] = useState(false);
  const [followingFollowerModal, setFollowingFollowerModal] = useState(false);
  const [changePhotoModal, setChangePhotoModal] = useState(false);
  const [viewPhotoModal, setViewPhotoModal] = useState(false);

  useLayoutEffect(() => {
    dispatch(userInfoRequest());
    dispatch(getLikeNoteRequest({ type: fldType }));
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
                {dimensions.width <= 768 ? (
                  <DropDown
                    right="0"
                    width="12.5rem"
                    btn={
                      <SettingIcon
                        style={{ height: "1.5rem", width: "1.5rem" }}
                      />
                    }
                    className={styles.dropdown}
                  >
                    <div
                      className={styles.dropDownContent}
                      onClick={() => setEditModal(true)}
                    >
                      <EditPensil
                        className={styles.svgIcon}
                        style={{ height: "1.5rem" }}
                      />
                      <h1 className={styles.dropDownContentheading}>
                        Edit Profile
                      </h1>
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
                      onClick={() => setFindPeopleModal(true)}
                    >
                      <img
                        src={addPeoplesIcon}
                        alt=""
                        className={styles.svgIcon}
                      />
                      <h1 className={styles.dropDownContentheading}>
                        Find Peoples
                      </h1>
                    </div>
                    <div
                      className={styles.dropDownContent}
                      onClick={() => setFeedbackBool(true)}
                    >
                      <img
                        src={feedbackIcon}
                        alt=""
                        className={styles.svgIcon}
                      />
                      <h1 className={styles.dropDownContentheading}>
                        Feedback
                      </h1>
                    </div>
                    <div
                      className={styles.dropDownContent}
                      onClick={() => setDeleteModal(true)}
                    >
                      <Delete className={styles.svgIcon} />
                      <h1 className={styles.dropDownContentheading}>
                        Delete Account
                      </h1>
                    </div>
                    <div
                      className={styles.dropDownContent}
                      onClick={() => {
                        navigate("/");
                        dispatch(logoutRequest());
                      }}
                    >
                      <Logout height="1rem" className={styles.svgIcon} />
                      <h1 className={styles.dropDownContentheading}>Logout</h1>
                    </div>
                  </DropDown>
                ) : null}

                <DropDown
                  left="0"
                  width="12.5rem"
                  btn={
                    <>
                      {userData?.imgUrl ? (
                        <img
                          src={userData?.imgUrl}
                          alt=""
                          className={styles.userImage}
                        />
                      ) : (
                        <Profile className={styles.userImage} />
                      )}
                    </>
                  }
                  // className={styles.dropdown}
                >
                  {userData?.imgUrl ? (
                    <div
                      className={styles.dropDownContent}
                      onClick={() => setViewPhotoModal(true)}
                    >
                      <EditPensil
                        className={styles.svgIcon}
                        style={{ height: "1.5rem" }}
                      />
                      <h1 className={styles.dropDownContentheading}>
                        view photo
                      </h1>
                    </div>
                  ) : null}
                  <div
                    className={styles.dropDownContent}
                    onClick={() => setChangePhotoModal(true)}
                  >
                    <ChangePasswordIcon
                      style={{ height: "1rem", transform: "Scale(1.5)" }}
                      className={styles.svgIcon}
                    />
                    <h1 className={styles.dropDownContentheading}>
                      change photo
                    </h1>
                  </div>
                </DropDown>

                <div className={styles.userInfo}>
                  <p className={styles.uniqueUserName}>{userData.username}</p>
                  <p className={styles.userName}>{userData.name}</p>
                  <p className={styles.userBio}>{userData.bio}</p>
                </div>
              </div>

              <div className={styles.followCountContainer}>
                <Button
                  className={`${styles.followCard} ${
                    toggle === "Followers" && dimensions.width > 768
                      ? styles.active
                      : null
                  }
                  `}
                  onClick={() => {
                    setToggle("Followers");
                    if (dimensions.width <= 768)
                      setFollowingFollowerModal(true);
                  }}
                >
                  <h3>{userData?.followers?.length ?? 0}</h3>
                  <p>Followers</p>
                </Button>
                <Button
                  className={`${styles.followCard} ${
                    toggle === "Following" && dimensions.width > 768
                      ? styles.active
                      : null
                  }
                  `}
                  onClick={() => {
                    setToggle("Following");
                    if (dimensions.width <= 768)
                      setFollowingFollowerModal(true);
                  }}
                >
                  <h3>{userData?.following?.length ?? 0}</h3>
                  <p>Following</p>
                </Button>
              </div>
              {dimensions.width > 768 ? (
                <div className={styles.followersListContainer}>
                  <p>{toggle}</p>
                  <FollowerContainer
                    data={
                      toggle === "Following"
                        ? userData?.following
                        : userData?.followers
                    }
                  />
                </div>
              ) : null}
            </div>

            <div className={styles.rightContainer}>
              {dimensions.width > 768 ? (
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
                    <img
                      src={addPeoplesIcon}
                      alt=""
                      className={styles.svgIcon}
                    />
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
                      onClick={() => {
                        navigate("/");
                        dispatch(logoutRequest());
                      }}
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
                      <h1 className={styles.dropDownContentheading}>
                        Delete Account
                      </h1>
                    </div>
                  </DropDown>
                </div>
              ) : null}

              <div className={`${styles.notesContainer} scrollbar`}>
                <div className={styles.noteContainerHead}>
                  <p>
                    <img src={HeartIcon} alt="" style={{ width: "1.5rem" }} />
                    Liked Notes
                  </p>
                  <DropDown
                    right="0"
                    width="9rem"
                    btn={
                      <div className={styles.folderTypes}>
                        <p>
                          {fldType === folderType.PRS
                            ? "Personal"
                            : fldType === folderType.SBO
                            ? "Shared by others"
                            : "Shared by you"}
                        </p>
                        <UpArrow style={{ transform: "rotate(180deg)" }} />
                      </div>
                    }
                  >
                    <div
                      className={styles.dropDownContent}
                      onClick={() => {
                        setFldType(folderType.PRS);
                        dispatch(getLikeNoteRequest({ type: folderType.PRS }));
                      }}
                    >
                      <h1 className={styles.dropDownContentheading}>
                        Personal
                      </h1>
                    </div>
                    <div
                      className={styles.dropDownContent}
                      onClick={() => {
                        setFldType(folderType.SBY);
                        dispatch(getLikeNoteRequest({ type: folderType.SBY }));
                      }}
                    >
                      <h1 className={styles.dropDownContentheading}>
                        Shared by you
                      </h1>
                    </div>
                    <div
                      className={styles.dropDownContent}
                      onClick={() => {
                        setFldType(folderType.SBO);
                        dispatch(getLikeNoteRequest({ type: folderType.SBO }));
                      }}
                    >
                      <h1 className={styles.dropDownContentheading}>
                        Shared by others
                      </h1>
                    </div>
                  </DropDown>
                </div>
                {getLikedNoteLoading ? (
                  <div className={styles.noteSpinnerCont}>
                    <Spinner />
                  </div>
                ) : (
                  <div className={`${styles.likeNoteCont} output`}>
                    {likedNotes?.map((cur, ind) => {
                      return (
                        <NoteContainer
                          key={ind}
                          ref={undefined}
                          id={cur._id}
                          titleContent={cur.title}
                          textContent={cur.text}
                          selectedColor={cur?.colorCode}
                          isDashboard={true}
                        />
                      );
                    })}
                  </div>
                )}
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
        <FeedbackModal setModal={setFeedbackBool} />
      </Modal>

      <Modal
        onClose={() => setChangePasswordModal(false)}
        isModal={changePasswordModal}
        showCloseButton
        className="modal"
      >
        <ChangePasswordModal setModal={setChangePasswordModal} />
      </Modal>
      <Modal
        onClose={() => setChangePhotoModal(false)}
        isModal={changePhotoModal}
        showCloseButton
        className="modal"
      >
        <ChangePhotoModal
          setModal={setChangePhotoModal}
          // setImageURL={setImageURL}
          imgURL={userData?.imgUrl}
          userId={userData._id}
        />
      </Modal>
      <Modal
        onClose={() => setViewPhotoModal(false)}
        isModal={viewPhotoModal}
        showCloseButton
        className="modal"
      >
        <ViewPhotoModal imageURL={userData?.imgUrl} />
      </Modal>

      <Modal
        onClose={() => setFollowingFollowerModal(false)}
        isModal={followingFollowerModal}
        showCloseButton
        className="modal"
      >
        <h1 className="modalHeading">{toggle}</h1>
        <FollowerContainer
          style={{ maxHeight: "66vh" }}
          data={
            toggle === "Following" ? userData?.following : userData?.followers
          }
        />
      </Modal>
    </>
  );
};

export default Dashboard;
