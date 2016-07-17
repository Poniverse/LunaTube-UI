import {getOAuthData, storeOAuthData, getAccessToken} from "../helpers/oauth";

export function authenticate(req, res) {
  // TODO: This should be able to process it through an API call
  // so that it doesn't take the user away from the page.

  const data = {
    grant_type: 'authorization_code',
    code: req.query.code
  };

  if (!data.code) {
    res.status(400).send({error: "No code provided"});
  }

  getAccessToken(data)
    .then(response => {
      storeOAuthData(res, response.data);

      res.status(200).send({
        access_token: response.data.access_token
      });
    })
    .catch(error => {
      res.status(error.status).send(res.data);
    });
}

export function refresh(req, res) {
  const {refresh_token} = getOAuthData(req);

  if (!refresh_token) {
    return res.status(401).send();
  }

  const data = {
    grant_type: 'refresh_token',
    refresh_token
  };

  getAccessToken(data)
    .then(response => {
      storeOAuthData(res, response.data);

      res.status(200).send({
        access_token: response.data.access_token
      });
    })
    .catch(error => {
      // Clear cookies on error, there's nothing helpful in them now.
      res.cookie('oauth-secrets', '', {maxAge: -1, httpOnly: true});

      console.error(error);
      res.status(error.status).send(res.data);
    });
}

export function logout(req, res) {
  res.cookie('oauth-secrets', '', {maxAge: -1, httpOnly: true});

  res.status(204).send();
}
