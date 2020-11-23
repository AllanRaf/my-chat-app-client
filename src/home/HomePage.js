import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { InputField } from "./components/InputField";
import { login } from "../api-calls/ApiCalls";

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

  const onSubmit = async (event) => {
    const response = await login(event, username, password);

    if (response === "SUCCESS") {
      history.push("/lobby");
    } else {
      setError(true);
    }
  };
  return (
    <main>
      <div className="main-page">
        <h1 className="main-header">Hello to Allan's Chat Universe</h1>
        <form className="signup-form" onSubmit={onSubmit}>
          <div className="fields-container">
            <InputField
              onFocus={resetError}
              onChange={onChangeEmail}
              type="text"
              label="email"
            />

            <InputField
              onFocus={resetError}
              onChange={onChangePassword}
              type="Password"
              label="password"
            />
          </div>
          {error ? <div>email/password incorrect</div> : null}

          <Button variant="contained" color="primary" type="submit">
            Log In
          </Button>
        </form>
        <div className="main-secondary-text">
          <p>
            New user?
            <Link to="/signup" className="sign-up-link">
              <span>sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
