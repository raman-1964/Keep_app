import React, { useEffect } from "react";
import styles from "./callerDropDown.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../widgets/Button/Button";
import AudioVideo from "../../../../components/audioVideo/audioVideo";
import {
  getRemoteStream,
  handleAnswerCall,
  handleDeclineCall,
  makeRTCconnection,
  nothingDoneTocall,
} from "../../../../store/Actions/socket-call";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { defaultToastSetting } from "../../../../utils/constants";

const CallerDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { socket, waitToJoin, callDropDown, answerCall } = useSelector(
    (state) => state.socketCallReducer
  );

  const createAnswer = async () => {
    const _call = new AudioVideo(
      socket,
      callDropDown.config,
      callDropDown.from,
      (streams) => {
        dispatch(getRemoteStream(streams));
      }
    );
    await _call.startLocalStream();
    await _call.createAnswer(callDropDown.offer);

    dispatch(makeRTCconnection(_call));
    navigate(`/call/${callDropDown.from}`);
  };

  const declineCall = () => {
    socket.emit("decline-offer", { room: callDropDown.from });
    dispatch(handleDeclineCall());
  };

  useEffect(() => {
    if (socket) {
      function nothingDone() {
        dispatch(nothingDoneTocall());
        toast.warning("You missed one call", defaultToastSetting);
      }

      socket.on("nothing-done-to-call", nothingDone);
      return () => {
        socket.off("nothing-done-to-call", nothingDone);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (answerCall) createAnswer();
  }, [answerCall]);

  return (
    <>
      {waitToJoin === "started" ? (
        <div className={styles.callerDropDown}>
          <audio autoPlay style={{ display: "none" }}>
            <source src="/calm.mp3" type="audio/mp3" />
          </audio>
          <p>{callDropDown.from} is calling</p>
          <div className={styles.callerBtns}>
            <Button
              className={styles.button}
              onClick={() => dispatch(handleAnswerCall())}
            >
              Join
            </Button>
            <Button className={styles.button} onClick={() => declineCall()}>
              Decline
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CallerDropDown;
