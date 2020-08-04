import React from "react";
import { Route, Router } from "react-router-dom";
import { HomePage } from "../src/home/HomePage";
import { SignUpPage } from "./signup/SignUpPage";
import { ChatRoomPage } from "./rooms/ChatRoomPage";
import { createBrowserHistory as history } from "history";
import "./App.css";

const URL = "https://allanschat.herokuapp.com/";

function App() {
  return (
    <div className="App">
      <Router history={history()}>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/chatroom" component={ChatRoomPage} />
      </Router>
    </div>
  );
}

export default App;
