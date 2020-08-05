import React from "react";
import { Route, Router } from "react-router-dom";
import { HomePage } from "../src/home/HomePage";
import { SignUpPage } from "./signup/SignUpPage";
import { ChatRoomPage } from "./rooms/ChatRoomPage";
import { createBrowserHistory as history } from "history";
import "./App.css";

export const url = "http://localhost:5000";
//"https://allanschat.herokuapp.com";
//process.env.REACT_APP_CHATAPP_SERVER_URL || "http://localhost:5000";

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
