import React, { useState, useEffect } from "react";
import * as request from "superagent";
import io from "socket.io-client";
import { url } from "../App";
import { useLocation } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

export const ChatRoomPage = () => {
  const token = localStorage.getItem("token");
  // const socket = io.connect(`${url}`);

  const auth = token ? `Bearer ${token}` : undefined;

  const location = useLocation();

  useEffect(() => {
    request
      .get(`${url}/messages/${location.state.roomId}`)
      .set("Authorization", auth)
      .then((res) => {
        console.log("fetching messages");
        //setMessages(res.body);
      })
      .catch((error) => {
        console.log("error fetching messages");
      });

    /*     socket.on("chatmessage", (msg) => {
      addMessage(msg);
    }); */
    //setMessages(() => messages.concat(newMessage));

    /*     return () => {
      socket.emit("disconnect");
      socket.off();
    }; */
  }, []);

  /* useEffect(() => {
    console.log("new message arrived");
  }, [messagesAppended]);

  const addMessage = (msg) => {
    console.log("message returne", msg);

    setMessagesAppended([...messagesAppended, msg]);
    console.log("useState", messagesAppended);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    request
      .post(`${url}/message`)
      .set("Authorization", auth)
      .send({ newMessage })
      .then((res) => console.log("return message", res))
      .catch((error) => {
        console.log("error fetching messages");
      });

    socket.emit("chatmessage", { message: newMessage });
  };

  const onChange = (event) => {
    setNewMessage({ message: event.target.value });
  };*/

  const handleSubmitMessage = () => {
    console.log("handling submit message");
    request
      .post(`${url}/messages/${location.state.roomId}`)
      .set("Authorization", auth)
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
      <h1>Welcome to room {location.state.roomName}</h1>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmitMessage}
      >
        Log In
      </Button>
      {/*       <div>
        {messages.length > 0 ? (
          messages.map((message) => {
            return (
              <div>
                {message.username}: {message.message}
              </div>
            );
          })
        ) : (
          <div>No messages</div>
        )}
        {messagesAppended.length > 0
          ? messagesAppended.map((message) => {
              return (
                <div key={message.id}>
                  {message.username}: {message.message}
                </div>
              );
            })
          : null}
        <form className="signup-form" onSubmit={onSubmit}>
          <input
            className="sign-up-input"
            name="message"
            type="text"
            onChange={onChange}
            placeholder="Write your message here..."
          />
          <button className="signup-button" type="Submit">
            Post Message
          </button>
        </form>
      </div> */}
    </div>
  );
};
