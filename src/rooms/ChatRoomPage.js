import React, { useEffect, useState } from "react";
import * as request from "superagent";
//import io from "socket.io-client";
import { url } from "../App";

//process.env.REACT_APP_CHATAPP_SERVER_URL || "http://localhost:5000";

export const ChatRoomPage = () => {
  const token = localStorage.getItem("token");
  /*   const socket = io.connect(`${url}`, {
    query: {
      token: token,
    }, 
  });*/
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

    /*     socket.on("chatmessage", (msg) => {
      console.log("msg", msg);
      addMessage(msg);
      //const newMessage = { username: "Richie", message: msg.message.message };
      //setMessages(() => messages.concat(newMessage));
    }); */

    /*     return () => {
      socket.emit("disconnect");
      socket.off();
    }; */
  }, []);

  /*   const addMessage = (msg) => {
    const messageToAppend = {
      id: msg.id,
      username: msg.username,
      message: msg.message.message,
    };
    console.log("messageToAppend", messageToAppend);
    const newMessagesAppended = messagesAppended.concat(messageToAppend);
    setMessagesAppended(newMessagesAppended);
  }; */

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
    console.log("the messages are", messages);
    //socket.emit("chatmessage", { username: "Ritchie", message: newMessage });
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
                <div>
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
