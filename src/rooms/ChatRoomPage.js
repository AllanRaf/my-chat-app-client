import React, { useState, useEffect } from "react";
import * as request from "superagent";
import io from "socket.io-client";
import { url } from "../App";

export const ChatRoomPage = () => {
  const token = localStorage.getItem("token");
  const socket = io.connect(`${url}`);
  const [messages, setMessages] = useState(["hello"]);
  const [newMessage, setNewMessage] = useState({});

  const [messagesAppended, setMessagesAppended] = useState([]);

  const auth = token ? `Bearer ${token}` : undefined;

  useEffect(() => {
    request
      .get(`${url}/messages`)
      .set("Authorization", auth)
      .then((res) => {
        setMessages(res.body);
      })
      .catch((error) => {
        console.log("error fetching messages");
      });

    socket.on("chatmessage", (msg) => {
      addMessage(msg);
    });
    //setMessages(() => messages.concat(newMessage));

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
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
  };
  return (
    <div>
      <h1>Welcome to the main chat room</h1>
      <div>
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
      </div>
    </div>
  );
};
