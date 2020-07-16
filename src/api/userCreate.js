import axiosInstance from "./instance";

const UserCreate = (email, uid, name, username) => {
  axiosInstance.post("/usernameAdd", { username: username });
  axiosInstance.post("/userCreate", {
    email: email,
    uid: uid,
    name: name,
    username: username,
  });
};
export default UserCreate;
