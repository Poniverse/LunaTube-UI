export default (app) => {
  app.get('/auth/redirect', (req, res) => res.redirect(`${process.env.API_URL}/auth/`));
};
