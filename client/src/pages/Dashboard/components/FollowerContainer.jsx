import React from "react";
import styles from "../Dashboard.module.css";
import ChatIcon from "../../../assets/img/chatIcon.png";
import Button from "../../../widgets/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowRequest } from "../../../store/Actions/userAction";
import { createChatRequest } from "../../../store/Actions/chatAction";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Profile } from "../../../assets/svg/profile.svg";

const FollowerContainer = ({ data, style = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.userReducer);

  return (
    <div style={style} className={`scrollbar ${styles.followersList}`}>
      {data?.map((curr, ind) => (
        <div key={ind} className={styles.follower}>
          <div className={styles.wrapper}>
            {curr?.imgUrl ? (
              <img className={styles.followerImg} src={curr?.imgUrl} alt="" />
            ) : (
              <Profile className={styles.followerImg} />
            )}
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
            <img
              src={ChatIcon}
              alt=""
              className={styles.msgIcon}
              onClick={() =>
                dispatch(createChatRequest({ userId: curr._id, navigate }))
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowerContainer;
