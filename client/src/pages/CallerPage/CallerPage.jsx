import React, { useEffect, useRef } from "react";
import styles from "./CallerPage.module.css";
import { useSelector } from "react-redux";

const CallerPage = () => {
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  const { socket, connection, remoteStream } = useSelector(
    (state) => state.socketCallReducer
  );

  useEffect(() => {
    if (socket) {
      async function recieveAnswer(answer) {
        if (connection) await connection.answeRecieved(answer);
      }

      async function iceCandidate(candidate) {
        try {
          if (candidate) await connection.addIceCandidate(candidate);
        } catch (error) {}
      }

      socket.on("answer", recieveAnswer);
      socket.on("ice-candidate", iceCandidate);

      return () => {
        socket.off("answer", recieveAnswer);
        socket.off("ice-candidate", iceCandidate);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (connection) localRef.current.srcObject = connection.getLocalStream();
  }, []);

  useEffect(() => {
    if (remoteStream?.id && remoteRef.current)
      remoteRef.current.srcObject = remoteStream;
  }, [remoteRef.current, remoteStream?.id]);

  console.log(
    localRef.current?.srcObject,
    remoteRef.current?.srcObject,
    remoteStream
  );

  return (
    <div className={styles.callerContainer}>
      waiting for user to join the call
      <div>
        <div>
          <video
            width="250px"
            height="250px"
            ref={localRef}
            autoPlay={true}
            controls
          ></video>
        </div>
        <div>
          <video
            width="250px"
            height="250px"
            ref={remoteRef}
            autoPlay={true}
            controls
          ></video>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default CallerPage;
