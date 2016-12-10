import axios from 'axios';
import * as crypto from 'crypto';

export function storeAuthData(res, {user, jwt, exp}) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + jwt;

  const cookieValue = JSON.stringify({
    user,
    jwt,
    exp,
  });

  res.cookie('auth-secrets', encrypt(cookieValue), {maxAge: 900000, httpOnly: true});
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

export function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.APP_KEY);
  let crypted = cipher.update(text, 'utf8', 'base64');
  crypted += cipher.final('base64');

  return crypted;
}

export function decrypt(text) {
  const cipher = crypto.createDecipher('aes-256-cbc', process.env.APP_KEY);
  let crypted = cipher.update(text, 'base64', 'utf8');
  crypted += cipher.final('utf8');

  return crypted;
}
