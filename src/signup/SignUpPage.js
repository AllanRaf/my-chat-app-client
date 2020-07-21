import React, { useState } from "react";

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submitting credentials", username, password);
  };

  const onChangeEmail = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
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
