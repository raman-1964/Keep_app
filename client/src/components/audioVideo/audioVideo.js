class AudioVideo {
  io;
  connection;
  localStream;
  callConfig;
  offer;
  room;

  constructor(io, config, room, fn) {
    this.connection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    this.io = io;
    this.room = room;
    this.callConfig = config;

    io.on("ice-candidate", async (candidate) => {
      try {
        if (candidate && this.connection)
          await this.connection.addIceCandidate(candidate);
      } catch (error) {
        console.log(error);
      }
    });

    this.connection.ontrack = (ev) => {
      if (ev.streams[0]) fn(ev.streams[0]);
    };

    this.connection.onicecandidate = (e) => {
      try {
        if (e.candidate)
          io.emit("ice-candidate", { room, candidate: e.candidate });
      } catch (error) {
        console.log(error);
      }
    };

    // this.connection.onconnectionstatechange = (event) => {
    //   switch (this.connection.connectionState) {
    //     case "connecting":
    //       this.connectionState = "connecting";
    //       break;
    //     case "connected":
    //       this.connectionState = "connected";
    //       break;
    //   }
    // };
  }

  //  CREATING OFFER
  async createOffer() {
    try {
      const offer = await this.connection.createOffer();
      await this.connection.setLocalDescription(offer);
      this.offer = offer;

      this.io.emit("offer", {
        room: this.room,
        config: this.callConfig,
        offer,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //  ACCEPTING OFFER
  async createAnswer(offer) {
    try {
      this.connection.setRemoteDescription(new RTCSessionDescription(offer));

      //    CREATING ANSWER
      const answer = await this.connection.createAnswer();
      await this.connection.setLocalDescription(answer);

      this.io.emit("answer", { room: this.room, answer });
    } catch (error) {
      console.log(error);
    }
  }

  //  SETTING OR ANSWER
  async answeRecieved(answer) {
    try {
      const remoteDesc = new RTCSessionDescription(answer);
      await this.connection.setRemoteDescription(remoteDesc);
    } catch (error) {
      console.log(error);
    }
  }

  //  STARTING LOCAL STREAM
  async startLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(
        this.callConfig
      );

      this.localStream.getTracks().forEach((track) => {
        this.localStream && this.connection.addTrack(track, this.localStream);
      });
    } catch (error) {
      console.log(error);
    }
  }

  getLocalStream() {
    return this.localStream;
  }

  destroy() {
    this.io = null;
    this.connection = null;
    this.localStream = null;
    this.callConfig = null;
    this.room = null;
  }

  callAgain() {
    try {
      this.io.emit("offer", {
        room: this.room,
        config: this.callConfig,
        offer: this.offer,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AudioVideo;
