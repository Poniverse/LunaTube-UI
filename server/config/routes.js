import * as AuthController from "../controllers/AuthController";

export default (app) => {
  app.get('/auth/redirect', AuthController.redirectToPoniverse);
  app.get('/auth/oauth', AuthController.authenticate);
  // app.post('/auth/refresh', AuthController.refresh); TODO: This
  app.post('/auth/logout', AuthController.logout);
};
