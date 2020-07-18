import React from "react";
import Button from "@material-ui/core/Button";

export function HomePage() {
  return (
    <main>
      <div class="main-page">
        <h1 class="main-header">Hello to Allan's Chat Universe</h1>
        <img
          class="main-image"
          width="300px"
          src="https://lh3.googleusercontent.com/proxy/EARWHzvmNrJxIzGbWoE-P5Pgug2zu3xQ-dn__vF7mEWL3Wp4sGkwxrHW3DesXFFE9ndm2_YqaajzWNWg9x76R0NVZ2heyGEV9mMUMjCeXOmHSyH1NA0yLyjFQzSratgxI-eaDBqzhgmrPxLQ6YHY1SE"
          alt="dog"
        />
        <Button
          class="main-button"
          variant="contained"
          color="primary"
          size="large"
        >
          Log In
        </Button>
      </div>
    </main>
  );
}
