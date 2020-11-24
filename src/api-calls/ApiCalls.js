import * as request from "superagent";
import { url } from "../App";
const token = localStorage.getItem("token");
const auth = token ? `Bearer ${token}` : undefined;

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

export const getRooms = async () => {
  try {
    const response = await request
      .get(`${url}/chatrooms`)
      .set("Authorization", auth);

    return response.body;
    //setChatrooms((prevRooms) => [...res.body]);
  } catch {
    return "ERROR";
  }
};

export const addChatRoom = async (event, roomName) => {
  event.preventDefault();

  try {
    const response = await request
      .post(`${url}/chatroom`)
      .set("Authorization", auth)
      .send({ roomName });

    return response;
  } catch {
    return "ERROR";
  }
};
