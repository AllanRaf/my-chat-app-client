import React, { useState } from "react";
import * as request from "superagent";
import { url } from "../App";
//
export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submitting credentials", email, username, password);
    request
      .post(`${url}/user`)
      .send({ email, username, password })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log("got an error", error));
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="sign-up">
      <h1>Create a new user account</h1>
      <form className="signup-form" onSubmit={onSubmit}>
        <input
          className="sign-up-input"
          name="email"
          type="text"
          onChange={onChangeEmail}
          placeholder="email"
        />
        <input
          className="sign-up-input"
          name="username"
          type="text"
          onChange={onChangeUserName}
          placeholder="username"
        />

        <input
          className="sign-up-input"
          name="password"
          type="text"
          onChange={onChangePassword}
          placeholder="password"
        />

        <button className="signup-button" type="Submit">
          Create a new account
        </button>
      </form>
    </div>
  );
};
