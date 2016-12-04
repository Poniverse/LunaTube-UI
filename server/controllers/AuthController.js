import axios from "axios";
import {getOAuthData, storeAuthData, getAccessToken} from "../helpers/auth";


export function redirectToPoniverse(req, res) {
  const queryString = [
    'response_type=code',
    'client_id=' + process.env.PONIVERSE_CLIENT_ID,
    'redirect_uri=http://localhost:3000/auth/oauth'
  ];

  res.redirect('https://poniverse.net/oauth/authorize?' + queryString.join('&'))
}

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

  axios.post('/auth/poniverse', {
    code: data.code
  })
    .then(response => {
      const json = JSON.stringify(response.data);

      res.status(200).send(`
<html>
<body>
<script>
  parent.postMessage(${json}, "${process.env.APP_URL}");
</script>
</body>
</html>
`);
    })
    .catch(error => {
      res.status(error.status).send(error.data);
    });
}

export function refresh(req, res) {
  const {refresh_token} = getAuthData(req);

  if (!refresh_token) {
    return res.status(401).send();
  }

  const data = {
    grant_type: 'refresh_token',
    refresh_token
  };

  getAccessToken(data)
    .then(response => {
      storeAuthData(res, response.data);

      res.status(200).send(response.data);
    })
    .catch(error => {
      // Clear cookies on error, there's nothing helpful in them now.
      res.cookie('auth-secrets', '', {maxAge: -1, httpOnly: true});

      console.error(error);
      res.status(error.status).send(res.data);
    });
}

export function logout(req, res) {
  res.cookie('auth-secrets', '', {maxAge: -1, httpOnly: true});

  res.status(204).send();
}
