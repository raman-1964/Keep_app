import React, { useState } from "react";
import Input from "../../../widgets/Input/Input";
import Button from "../../../widgets/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordRequest,
  updateUserInfoRequest,
} from "../../../store/Actions/userAction";
import UserName from "../../../components/userName/UserName";
import hidePassword from "../../../assets/img/hidePassword.png";
import showPassword from "../../../assets/img/showPassword.png";
import SelectAsync from "../../../components/SelectAsync/SelectAsync";
import FollowerContainer from "./FollowerContainer";

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
      <h1 className="modalHeading">Edit Profile Information</h1>

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
          placeholder="enter your Bio"
          name="bio"
          value={updatedData}
          setValue={setUpdatedData}
        />
      </div>
      <Button
        spinnerTheme="light"
        onClick={() => handleUpdate()}
        loading={updateUserLoading}
      >
        Update
      </Button>
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

      <Button
        spinnerTheme="light"
        loading={changePasswordLoading}
        onClick={() => dispatch(changePasswordRequest({ password, setModal }))}
      >
        Change Password
      </Button>
    </>
  );
};

const FeedbackModal = () => {
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
          placeholder="Describe Issues you faced..."
          name="message"
          value={feedback}
          setValue={setFeedback}
        />
      </div>
      <Button spinnerTheme="light">Submit Feedback</Button>
    </>
  );
};

export {
  DashboardEditModal,
  FeedbackModal,
  FindPeopleModal,
  ChangePasswordModal,
};
