import React, { useState } from "react";
import Input from "../../../widgets/Input/Input";
import styles from "./DashboardModal.module.css";
import Button from "../../../widgets/Button/Button";

const DashboardEditModal = ({ userInfo, setUserInfo }) => {
  return (
    <>
      <h1 className="modalHeading">Edit Profile Information</h1>
      <div className="inputCont">
        <h1>Name</h1>
        <Input
          type="text"
          placeholder="enter your name"
          name="name"
          value={userInfo}
          setValue={setUserInfo}
        />
      </div>
      <div className="inputCont">
        <h1>Unique username</h1>
        <Input
          type="text"
          placeholder="enter username"
          name="username"
          value={userInfo}
          setValue={setUserInfo}
        />
      </div>
      <div className="inputCont">
        <h1>Edit Bio</h1>
        <Input
          type="textarea"
          placeholder="enter your Bio"
          name="userbio"
          value={userInfo}
          setValue={setUserInfo}
        />
      </div>
      <Button>Save</Button>
    </>
  );
};

const FindPeopleModal = () => {
  return (
    <>
    </>
  );
};

const FeedbackModal = () => {
  const [feedback, setFeedback] = useState("");
  return (
    <>
      <h1 className="modalHeading">Help Us To Improve</h1>
      <div className="inputCont">
        <h1>Email</h1>
        <Input
          type="text"
          placeholder="example@xyz.com"
          name="feedback"
          value={feedback}
          setValue={setFeedback}
        />
      </div>
      <div className="inputCont">
        <h1>Subject</h1>
        <Input
          type="text"
          placeholder="Regarding xyz..."
          name="feedback"
          value={feedback}
          setValue={setFeedback}
        />
      </div>
      <div className="inputCont">
        <h1>Write your Issues...</h1>
        <Input
          type="textarea"
          placeholder="Describe Issues you faced..."
          name="feedback"
          value={feedback}
          setValue={setFeedback}
        />
      </div>
      <Button>Submit Feedback</Button>
    </>
  );
};

export { DashboardEditModal, FeedbackModal, FindPeopleModal };
