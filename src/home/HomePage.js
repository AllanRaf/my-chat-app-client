import React, { useState } from "react";
import * as request from "superagent";
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_CHATAPP_SERVER_URL || "http://localhost:5000";

export function HomePage({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const resetError = () => {
    if (error) {
      setError(false);
    }
  };

  const onChangeEmail = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submitting credentials", username, password);
    request
      .post(`${url}/login`)
      .send({ email: username, password })
      .then((res) => {
        console.log(res.body);
        localStorage.setItem("name", res.body.name);
        localStorage.setItem("token", res.body.jwt);
        history.push("/chatroom");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <main>
      <div className="main-page">
        <h1 className="main-header">Hello to Allan's Chat Universe</h1>
        <h2>Work in progress</h2>
        <form className="signup-form" onSubmit={onSubmit}>
          <input
            onFocus={resetError}
            className="sign-up-input"
            name="email"
            type="text"
            onChange={onChangeEmail}
            placeholder="email"
          />

          <input
            onFocus={resetError}
            className="sign-up-input"
            name="password"
            type="text"
            onChange={onChangePassword}
            placeholder="password"
          />
          {error ? <div>email/password incorrect</div> : null}

          <button className="signup-button" type="Submit">
            Log In
          </button>
        </form>
        <div className="main-secondary-text">
          <p>
            New user?
            <Link to="/signup">
              {" "}
              <span className="main-sign-in">sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
