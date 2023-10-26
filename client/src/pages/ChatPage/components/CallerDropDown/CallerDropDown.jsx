import React, { useEffect } from "react";
import styles from "./callerDropDown.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../widgets/Button/Button";
import AudioVideo from "../../../../components/audioVideo/audioVideo";
import {
  handleAnswerCall,
  makeRTCconnection,
} from "../../../../store/Actions/socket-call";
import { useNavigate } from "react-router-dom";

const CallerDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { socket, callDropDown, answerCall, connection } = useSelector(
    (state) => state.socketCallReducer
  );

  const createAnswer = async () => {
    const _call = new AudioVideo(
      socket,
      callDropDown.config,
      callDropDown.from
    );
    await _call.startLocalStream();
    await _call.createAnswer(callDropDown.offer);

    dispatch(makeRTCconnection(_call));
    navigate("/call");
  };

  useEffect(() => {
    if (socket) {
      async function iceCandidate(candidate) {
        try {
          console.log("candidate recieved", candidate);
          if (candidate) await connection.addIceCandidate(candidate);
        } catch (error) {}
      }

      socket.on("ice-candidate", iceCandidate);

      return () => {
        socket.off("ice-candidate", iceCandidate);
      };
    }
  }, []);

  useEffect(() => {
    if (socket && answerCall) createAnswer();
  }, [socket, answerCall]);

  return (
    <>
      {callDropDown.show ? (
        <div className={styles.callerDropDown}>
          <p>call is coming</p>
          <div className={styles.callerBtns}>
            <Button onClick={() => dispatch(handleAnswerCall())}>answer</Button>
            <Button>decline</Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CallerDropDown;
