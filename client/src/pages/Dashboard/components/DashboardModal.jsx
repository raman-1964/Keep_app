import React, { useRef, useState } from "react";
import Input from "../../../widgets/Input/Input";
import Button from "../../../widgets/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordRequest,
  changePhotoRequest,
  sendFeedbackRequest,
  updateUserInfoRequest,
} from "../../../store/Actions/userAction";
import UserName from "../../../components/userName/UserName";
import hidePassword from "../../../assets/img/hidePassword.png";
import showPassword from "../../../assets/img/showPassword.png";
import SelectAsync from "../../../components/SelectAsync/SelectAsync";
import { ReactComponent as TrayArrowUp } from "../../../assets/svg/tray_arrow_up.svg";
import FollowerContainer from "./FollowerContainer";
import styles from "../Dashboard.module.css";
import { toast } from "react-toastify";
import { defaultToastSetting } from "../../../utils/constants";
import { deleteFile, uploadFile } from "../../../services/upload.services";
import Spinner from "../../../components/Spinner/Spinner";
import { ReactComponent as Close } from "../../../assets/svg/close.svg";

const DashboardEditModal = ({ userInfo, setEditModal }) => {
  const dispatch = useDispatch();

  const [updatedData, setUpdatedData] = useState({
    name: userInfo.name,
    username: userInfo.username,
    bio: userInfo.bio,
  });

  const { updateUserLoading } = useSelector((state) => state.userReducer);

  const handleUpdate = () => {
    dispatch(updateUserInfoRequest({ updatedData, setEditModal }));
  };

  return (
    <>
      <h1 className="modalHeading">Update Your Profile</h1>

      <UserName value={updatedData} setValue={setUpdatedData} />
      <div className="inputCont">
        <h1>Name</h1>
        <Input
          type="text"
          placeholder="enter your name"
          name="name"
          value={updatedData}
          setValue={setUpdatedData}
        />
      </div>
      <div className="inputCont">
        <h1>Edit Bio</h1>
        <Input
          type="textarea"
          className="textarea scrollbar"
          placeholder="enter your Bio"
          name="bio"
          value={updatedData}
          setValue={setUpdatedData}
        />
      </div>

      <div className={styles.modalBtnCont}>
        <Button
          spinnerTheme="light"
          onClick={() => handleUpdate()}
          loading={updateUserLoading}
        >
          Update
        </Button>
      </div>
    </>
  );
};

const FindPeopleModal = () => {
  const [data, setData] = useState([]);
  const handleSearch = (e) => {
    setData(e);
  };

  return (
    <>
      <h1 className="modalHeading">Find People</h1>
      <SelectAsync onChange={handleSearch} isProfile={true} />
      <FollowerContainer style={{ maxHeight: "66vh" }} data={data} />
    </>
  );
};

const ChangePasswordModal = ({ setModal }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    oldP: "",
    newP: "",
  });
  const [seePassword, setSeePassword] = useState(false);

  const { changePasswordLoading } = useSelector((state) => state.userReducer);

  return (
    <>
      <h1 className="modalHeading">Change Password</h1>

      <div className="log-input">
        <h1>Old Password</h1>
        <Input
          type="password"
          placeholder="Enter your old password"
          name="oldP"
          value={password}
          setValue={setPassword}
        />
      </div>

      <div style={{ marginBottom: "2rem" }} className="log-input">
        <h1>New Password</h1>
        <Input
          type={seePassword ? "text" : "password"}
          placeholder="Enter your new password"
          autoComplete="off"
          name="newP"
          value={password}
          setValue={setPassword}
        />
        <img
          src={seePassword ? hidePassword : showPassword}
          alt="ShowHideEye"
          onClick={() => setSeePassword(!seePassword)}
          className="seeOrHidePassword"
        />
      </div>

      <div className={styles.modalBtnCont}>
        <Button
          spinnerTheme="light"
          loading={changePasswordLoading}
          onClick={() =>
            dispatch(changePasswordRequest({ password, setModal }))
          }
        >
          Change Password
        </Button>
      </div>
    </>
  );
};

const FeedbackModal = ({ setModal }) => {
  const { sendFeedbackLoading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState({
    subject: "",
    message: "",
  });

  return (
    <>
      <h1 className="modalHeading">Help Us To Improve</h1>

      <div className="inputCont">
        <h1>Subject</h1>
        <Input
          type="text"
          placeholder="Regarding xyz..."
          name="subject"
          value={feedback}
          setValue={setFeedback}
        />
      </div>
      <div className="inputCont">
        <h1>Write your Issues...</h1>
        <Input
          type="textarea"
          className="textarea scrollbar"
          placeholder="Describe Issues you faced..."
          name="message"
          value={feedback}
          setValue={setFeedback}
        />
      </div>
      <div className={styles.modalBtnCont}>
        <Button
          spinnerTheme="light"
          loading={sendFeedbackLoading}
          onClick={() => dispatch(sendFeedbackRequest({ feedback, setModal }))}
        >
          Submit Feedback
        </Button>
      </div>
    </>
  );
};

const ViewPhotoModal = ({ imageURL }) => {
  return (
    <div className={styles.viewPhotoCont}>
      <img className={styles.viewPhoto} src={imageURL} alt="userImage" />
    </div>
  );
};

const ChangePhotoModal = ({ setModal, userId, imgURL }) => {
  const dispatch = useDispatch();

  let inputRef = useRef(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageURL, setImageURL] = useState(imgURL);

  const fileChangeHandler = (files, cb) => {
    const imgFile = files[0];
    console.log(imgFile);

    const type = imgFile.type.split("/")[0];
    if (type !== "image") {
      toast.warning("Only images are allowed", defaultToastSetting);
      return;
    }
    setUploadLoading(true);

    uploadFile(process.env.REACT_APP_UPLOAD_BUCKET, imgFile, userId)
      .then((res) => {
        setImageURL(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setUploadLoading(false));

    if (cb && typeof cb === "function") {
      cb();
    }
  };

  const removeImage = () => {
    setUploadLoading(true);

    deleteFile(userId)
      .then((res) => {
        setImageURL("");
      })
      .catch((err) => console.log(err))
      .finally(() => setUploadLoading(false));
  };

  return (
    <>
      <h1 className="modalHeading">Change Photo</h1>
      {!imageURL ? (
        <div
          className={styles.dragNdrop}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            fileChangeHandler(e.dataTransfer.files);
          }}
        >
          {!uploadLoading ? (
            <>
              <TrayArrowUp />
              <p>Drag and drop file here</p>
              <p>or</p>
              <Button
                className={styles.browseFilesBtn}
                onClick={() => {
                  inputRef.click();
                }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    fileChangeHandler(e.target.files, () => {
                      e.target.value = null;
                    });
                  }}
                  ref={(fileInput) => {
                    inputRef = fileInput;
                  }}
                  accept="image/*"
                />
                Browse files
              </Button>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <div className={styles.dragNdrop}>
          {!uploadLoading ? (
            <div className={styles.profileImageCont}>
              <Close onClick={() => removeImage()} className={styles.close} />
              <img src={imageURL} alt="profile" />
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )}
      <div className={styles.modalBtnCont}>
        <Button
          onClick={() => {
            dispatch(changePhotoRequest(imageURL));
            setModal(false);
          }}
        >
          Change Photo
        </Button>
      </div>
    </>
  );
};

export {
  DashboardEditModal,
  FeedbackModal,
  FindPeopleModal,
  ChangePasswordModal,
  ViewPhotoModal,
  ChangePhotoModal,
};
