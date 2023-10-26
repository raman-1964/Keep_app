class AudioVideo {
  io;
  connection;
  localStream;
  remoteStream;
  callConfig;
  room;

  constructor(io, config, room) {
    this.connection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    this.io = io;
    this.room = room;
    this.callConfig = config;
    this.remoteStream = new MediaStream();

    io.on("decline-offer", () => {
      this.connection = null;
    });

    // io.on("answer", async (answer) => {
    //   try {
    //     const remoteDesc = new RTCSessionDescription(answer);
    //     await this.connection.setRemoteDescription(remoteDesc);
    //   } catch (error) {}
    // });

    // io.on("offer", async (offer) => {
    //   console.log("offer recieved ", offer);
    //   try {
    //     this.connection.setRemoteDescription(new RTCSessionDescription(offer));

    //     const answer = await this.connection.createAnswer();
    //     await this.connection.setLocalDescription(answer);

    //     this.io.emit("answer", { room: this.room, answer });
    //   } catch (error) {}
    // });

    this.connection.ontrack = (ev) => {
      console.log("recieving remote stream ", ev.streams[0]);
      if (ev.streams[0]) {
        this.remoteStream = ev.streams[0];
      }
    };

    this.connection.onicecandidate = (e) => {
      try {
        console.log("candidate sent", room);
        if (e.candidate)
          io.emit("ice-candidate", { room, candidate: e.candidate });
      } catch (error) {
        console.log(error);
      }
    };
  }

  //CREATING OFFER
  async createOffer() {
    try {
      const offer = await this.connection.createOffer();
      await this.connection.setLocalDescription(offer);

      console.log("offer created ", this.room);
      this.io.emit("offer", {
        room: this.room,
        config: this.callConfig,
        offer,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ACCEPTING OFFER
  async createAnswer(offer) {
    try {
      this.connection.setRemoteDescription(new RTCSessionDescription(offer));

      //    CREATING ANSWER
      const answer = await this.connection.createAnswer();
      await this.connection.setLocalDescription(answer);

      console.log("offer received or creating answer", this.room);
      this.io.emit("answer", { room: this.room, answer });
    } catch (error) {
      console.log(error);
    }
  }

  async answeRecieved(answer) {
    try {
      const remoteDesc = new RTCSessionDescription(answer);
      await this.connection.setRemoteDescription(remoteDesc);
      console.log("answer set successfull");
    } catch (error) {
      console.log(error);
    }
  }

  // DECLINING OFFER
  declineOffer() {
    try {
      this.io.emit("decline-offer", { room: this.room });
    } catch (error) {}
  }

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

  getRemoteStream() {
    return this.remoteStream;
  }
  getLocalStream() {
    return this.localStream;
  }
}

export default AudioVideo;
