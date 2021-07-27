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
    logoutUser: function () {
      return axios.post("/api/user/logout")
      .then(result => result.data)
      .catch(e => e);
    },
    currentUser: function (username, password) {
      return axios.get("/api/user/currentUser").then(result => result.data)
      .catch(e => e);
    },
    createStudyGuide: function (name) {
      return axios.post("/api/study-guide", {name}).then(result => result.data)
      .catch(e => e);
    },
    updateUser: function (body) {
      return axios.put(`/api/user/${body._id}`, body).then(result => result.data)
      .catch(e => e);
    },
    updateStudyGuide: function (body) {
      return axios.put(`/api/study-guide/${body._id}`, body).then(result => result.data)
      .catch(e => e);
    },
};