import axios from "axios";
import {encrypt, decrypt} from "./encryption";

const oauthClient = {
  client_id: process.env.PONIVERSE_CLIENT_ID,
  client_secret: process.env.PONIVERSE_CLIENT_SECRET
};

export function getAccessToken(data) {
  const requestData = {
    redirect_uri: 'http://localhost:3000/auth/oauth',
    ...oauthClient,
    ...data
  };

  return axios
    .post('https://poniverse.net/oauth/access_token', requestData);
}

export function storeAuthData(res, {user, jwt, exp}) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + jwt;

  const cookieValue = JSON.stringify({
    user,
    jwt,
    exp
  });

  res.cookie('oauth-secrets', encrypt(cookieValue), {maxAge: 900000, httpOnly: true});
}

export function getAuthData(req) {
  try {
    return JSON.parse(decrypt(req.cookies['auth-secrets']));
  } catch (e) {
    console.log('Invalid cookie data');
    // Invalid cookie ciphertext
    // Ignore and handle below
    return {};
  }
}
