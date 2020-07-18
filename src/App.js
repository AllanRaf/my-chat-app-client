import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "../src/home/HomePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} />
    </div>
  );
}

export default App;
