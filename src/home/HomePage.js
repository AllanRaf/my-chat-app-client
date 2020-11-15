import React, { useState } from "react";
import * as request from "superagent";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { url } from "../App";

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

    request
      .post(`${url}/login`)
      .send({ email: username, password })
      .then((res) => {
        console.log(res.body);
        localStorage.setItem("name", res.body.name);
        localStorage.setItem("token", res.body.jwt);
        history.push("/lobby");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <main>
      <div className="main-page">
        <h1 className="main-header">Hello to Allan's Chat Universe</h1>
        <form className="signup-form" onSubmit={onSubmit}>
          <div className="fields-container">
            <span className="field-input">
              <TextField
                onFocus={resetError}
                id="outlined-basic"
                label="email"
                variant="outlined"
                name="email"
                onChange={onChangeEmail}
              />
            </span>
            <span className="field-input">
              <TextField
                onFocus={resetError}
                //id="filled-password-input"
                label="Password"
                type="password"
                onChange={onChangePassword}
                variant="outlined"
                className="field-input"
              />
            </span>
          </div>
          {error ? <div>email/password incorrect</div> : null}

          <Button variant="contained" color="primary" type="submit">
            Log In
          </Button>
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
