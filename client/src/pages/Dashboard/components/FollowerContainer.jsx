import React from "react";
import styles from "../Dashboard.module.css";
import ChatIcon from "../../../assets/img/chatIcon.png";
import Button from "../../../widgets/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowRequest } from "../../../store/Actions/userAction";

const FollowerContainer = ({ data, style = null }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <div style={style} className={`scrollbar ${styles.followersList}`}>
      {data?.map((curr, ind) => (
        <div key={ind} className={styles.follower}>
          <div className={styles.wrapper}>
            <div className={styles.followerImg}>
              <img src="" alt="" />
            </div>
            <div className={styles.userInfo}>
              <p>{curr.username}</p>
              <p className={styles.userName}>{curr.name}</p>
            </div>
          </div>
          <div className={styles.wrapper}>
            <Button
              className={styles.btn}
              onClick={() =>
                dispatch(
                  followUnfollowRequest({
                    isFollow: !curr?.followers?.includes(userData._id),
                    id: curr._id,
                  })
                )
              }
            >
              {curr?.followers?.includes(userData._id) ? "unfollow" : "follow"}
            </Button>
            <div className={styles.followerImg}>
              <img
                src={ChatIcon}
                alt=""
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  border: "none",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowerContainer;
