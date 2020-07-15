import React from "react";
import axiosInstance from "./instance";

const UsernameApi = async (username) => {
  const result = await axiosInstance.post("/usernameCheck", {
    username: username,
  });
  return result.data;
};
export default UsernameApi;
