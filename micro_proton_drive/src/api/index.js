
import axios from 'axios';

import store from './store';

var api;
var token;
const API_URL = 'http://localhost:8000/api';

function api_login (email, password) {
  return axios.post(`${API_URL}/auth/login`, { email, password });
}

function api_protected () {
  return api.get(`${API_URL}/protected`);
}

store.subscribe(function (state) {
  if (state.auth.token != token) {
    token = state.auth.token;

    api = axios.create({
      headers: {
        'Authorization': token
      }
    });
  }
});
