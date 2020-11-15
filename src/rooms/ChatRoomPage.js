import React, { useState, useEffect, useRef } from "react";
import * as request from "superagent";
import io from "socket.io-client";
import { url } from "../App";
import { useLocation } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import "./ChatRoomPage.css";

export const ChatRoomPage = () => {
  const token = localStorage.getItem("token");
  const socket = io.connect(`${url}`);
  const message = useRef("");
  const myName = localStorage.getItem("name");
  const [chatMessages, setChatMessages] = useState([]);
  const auth = token ? `Bearer ${token}` : undefined;
  const location = useLocation();

  useEffect(() => {
    request
      .get(`${url}/messages/${location.state.roomId}`)
      .set("Authorization", auth)
      .then((res) => {
        console.log("fetching messages");
      })
      .catch((error) => {
        console.log("error fetching messages");
      });

    socket.on(`${location.state.roomName}`, (msg) => {
      console.log("new message coming through", msg);
      setChatMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  const onChangeMessage = (event) => {
    message.current = event.target.value;
  };

  const handleSubmitMessage = () => {
    console.log("handling submit message with roomId", location.state.roomId);
    const messageToSend = message.current;

    request
      .post(`${url}/messages/${location.state.roomId}`)
      .set("Authorization", auth)
      .send({ messageToSend, roomName: location.state.roomName })
      .then((res) => {
        console.log("fetching messages", res);
        //setMessages(res.body);
      })
      .catch((error) => {
        console.log("error fetching messages");
      });
  };

  return (
    <div>
      <h1 className="title">Welcome to room {location.state.roomName}</h1>
      <TextField
        id="outlined-basic"
        label="message"
        variant="outlined"
        name="message"
        onChange={onChangeMessage}
      />
      <div style={styles.messageContainer}>
        {chatMessages.map((message) => {
          console.log("myName", myName, "other name", message.username);
          console.log("message", message);
          return (
            <div
              style={
                myName === message.username
                  ? styles.background
                  : styles.otherBackground
              }
              key={message.messageId}
            >
              <span>{message.username}: </span>
              <span> {message.message}</span>
            </div>
          );
        })}
      </div>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmitMessage}
        className="button"
      >
        Post Message
      </Button>
    </div>
  );
};

const styles = {
  messageContainer: {
    display: "flex",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    paddingLeft: "100px",
    paddingRight: "100px",
    borderWidth: "1px",
    borderRadius: "10px",
    borderStyle: "solid",
    borderColor: "#66ff33",
    flexDirection: "column",
  },
  background: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-end",
  },
  otherBackground: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
  myBackground: {
    alignItems: "flex-end",
  },
  text: {
    color: "#e3f2fd",
  },
};
