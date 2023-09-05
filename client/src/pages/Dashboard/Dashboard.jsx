import React from "react";
import "./Dashboard.css";
// import Profileimg from "../../assets/Profileimg.jpg";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="personal-info-container">
        <h3>Personal Information</h3>
        <div className="personal-info">
          <div className="userImage">
            {/* <img src={Profileimg} /> */}
          </div>
          <div className="userContact">
            <div className="userName">Sumit Singh</div>
            <div className="userEmail">sumitsingh89570@gmail.com</div>
            <div className="userPhoneNumber">+91 8957010398</div>
          </div>
        </div>
        <div className="account-operations">
          <button className="change-pass">Change Password</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
      <div className="personal-info-container">
        <h3>Favorite Notes</h3>
        <div className="fav-notes-container">
          {[...Array(5).keys()].map(() => (
            <div className="fav-notes">Liked notes will be show here.</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
