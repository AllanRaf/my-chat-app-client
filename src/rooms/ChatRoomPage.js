import React, { useEffect, useState } from "react";
import * as request from "superagent";

const url = process.env.REACT_APP_CHATAPP_SERVER_URL || "http://localhost:5000";

export const ChatRoomPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const token = localStorage.getItem("token");
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

    console.log("token saved", localStorage.getItem("token"));
  }, []);

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
  };

  const onChange = (event) => {
    setNewMessage({ message: event.target.value });
    console.log("new message", newMessage);
  };
  return (
    <div>
      <h1>Welcome to the main chat room</h1>
      <div>
        {messages.length > 0 ? (
          messages.map((message) => {
            return (
              <div key={message.id.toString()}>
                {message.username}: {message.message}
              </div>
            );
          })
        ) : (
          <div>No messages</div>
        )}
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
