import React from "react";
import Button from "@material-ui/core/Button";

export function HomePage() {
  return (
    <main>
      <div className="main-page">
        <h1 className="main-header">Hello to Allan's Chat Universe</h1>
        <h2>Work in progress</h2>
        <img
          className="main-image"
          width="300px"
          src="https://lh3.googleusercontent.com/proxy/EARWHzvmNrJxIzGbWoE-P5Pgug2zu3xQ-dn__vF7mEWL3Wp4sGkwxrHW3DesXFFE9ndm2_YqaajzWNWg9x76R0NVZ2heyGEV9mMUMjCeXOmHSyH1NA0yLyjFQzSratgxI-eaDBqzhgmrPxLQ6YHY1SE"
          alt="dog"
        />
        <Button
          className="main-button"
          variant="contained"
          color="primary"
          size="large"
        >
          Log In
        </Button>
        <div className="main-secondary-text">
          <p>
            New user? <text className="main-sign-in">sign in</text>
          </p>
        </div>
      </div>
    </main>
  );
}
