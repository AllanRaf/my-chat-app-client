import React, { useRef, useEffect, useState } from "react";
import { url } from "../App";
import io from "socket.io-client";
import * as request from "superagent";
import { Button, Grid, Paper } from "@material-ui/core";
import "./Lobby.css";
import "../index.css";

export const Lobby = ({ history }) => {
  const token = localStorage.getItem("token");
  const socket = io.connect(`${url}`);
  const chatRoom = useRef("");
  const auth = token ? `Bearer ${token}` : undefined;
  const [chatrooms, setChatrooms] = useState([{}]);

  useEffect(() => {
    request
      .get(`${url}/chatrooms`)
      .set("Authorization", auth)
      .then((res) => {
        console.log("the chatrooms are", res);
        setChatrooms((prevRooms) => [...res.body]);
      })
      .catch((error) => {
        console.log("error fetching chatrooms");
      });

    socket.on("chatrooms", (rooms) => {
      console.log("chatrooms", rooms);

      addRoom(rooms);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  const onChange = (event) => {
    chatRoom.current = event.target.value;
  };

  const addRoom = (newRoom) => {
    console.log("newRoom is", newRoom);
    const newRoomParsed = {
      roomName: newRoom.roomName,
      User: { username: newRoom.createdBy },
      id: newRoom.roomId,
    };
    setChatrooms((prevRooms) => [...prevRooms, newRoomParsed]);
  };
  const handleSubmit = (event) => {
    console.log("ref", chatRoom.current);
    const roomName = chatRoom.current;
    event.preventDefault();
    request
      .post(`${url}/chatroom`)
      .set("Authorization", auth)
      .send({ roomName })
      .then((res) => {
        console.log("return message in lobby", res);
        chatRoom.current = "";
      })
      .catch((error) => {
        console.log("error fetching messages", error);
      });
  };

  const handleOnJoinRoom = (roomId, roomName) => {
    console.log("joining room", roomId, roomName);
    request
      .post(`${url}/joinroom`)
      .set("Authorization", auth)
      .send({ roomId })
      .then((res) => {
        console.log("joined room");
        history.replace({ pathname: "/chatroom", state: { roomId, roomName } });
      })
      .catch((error) => {
        console.log("error joining room", error);
      });
  };
  return (
    <div>
      <h1 className="title">This is the Lobby</h1>
      <div className="second-title">Add a chat room</div>
      <form onSubmit={handleSubmit} className="form-add-room">
        <div className="main-page">
          <input
            className="sign-up-input"
            name="chatroom-name"
            type="text"
            onChange={onChange}
            placeholder="Name of room"
          />
          <button type="submit">Add a chat room</button>
        </div>
      </form>
      <Grid container spacing={5}>
        {chatrooms.map((chatroom) => {
          return (
            <Grid
              item
              xl={3}
              lg={3}
              sm={3}
              xs={12}
              className="chatroom-container"
            >
              <Paper className="chatroom-container">
                <span className="chatroom-title">
                  Room: {chatroom.roomName}
                </span>
                <span className="chatroom-creator">
                  created by:
                  {chatroom.User ? chatroom.User.username : "unknown"}
                </span>
                <span>
                  <Button
                    color="primary"
                    variant="contained"
                    small
                    className="button-add-room"
                    onClick={() => {
                      handleOnJoinRoom(chatroom.id, chatroom.roomName);
                    }}
                  >
                    <span className="button-add-room-text">
                      Click to join chat room
                    </span>
                  </Button>
                </span>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
