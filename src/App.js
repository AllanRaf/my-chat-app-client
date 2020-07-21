import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "../src/home/HomePage";
import { SignUpPage } from "./signup/SignUpPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route path="/signup" component={SignUpPage} />
    </div>
  );
}

export default App;
