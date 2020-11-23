import * as request from "superagent";
import { url } from "../App";

export const login = async (event, username, password) => {
  event.preventDefault();

  try {
    const response = await request
      .post(`${url}/login`)
      .send({ email: username, password });

    localStorage.setItem("name", response.body.name);
    localStorage.setItem("token", response.body.jwt);

    console.log("response is", response);
    return "SUCCESS";
  } catch {
    return "ERROR";
  }
};
