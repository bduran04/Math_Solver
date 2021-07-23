import axios from 'axios' 

export default {
    wolframInfo: function (equation) {
        return axios.post("/api/user/wolfram", {equation}).then(result => result.data);
      },
    createUser: function (userInfo) {
        return axios.post("/api/user", userInfo).then(result => result.data);
      },
    loginUser: function (username, password) {
        return axios.post("/api/user/login", {username, password})
        .then(result => result.data)
        .catch(e => e);
      }
};