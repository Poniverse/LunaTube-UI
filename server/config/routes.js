import * as OAuthController from "../controllers/OAuthController";

export default (app) => {
  app.get('/auth/redirect', OAuthController.redirectToPoniverse);
  app.get('/auth/oauth', OAuthController.authenticate);
  app.post('/auth/refresh', OAuthController.refresh);
  app.post('/auth/logout', OAuthController.logout);
};
