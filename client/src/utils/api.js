import axios from 'axios' 

export default {
    wolframInfo: function (equation) {
        return axios.post("/api/user/wolfram", {equation}).then(result => result.data);
      },
    createUser: function (username, password) {
        return axios.post("/api/user", {username, password}).then(result => result.data)
        .catch(e => e);
      },
    loginUser: function (username, password) {
        return axios.post("/api/user/login", {username, password})
        .then(result => result.data)
        .catch(e => e);
      },
    logoutUser: function (username, password) {
        return axios.post("/api/user/logout", {username, password})
        .then(result => result.data)
        .catch(e => e);
      },
    currentUser: function (username, password) {
      return axios.get("/api/user/currentUser").then(result => result.data)
      .catch(e => e);
    },
};