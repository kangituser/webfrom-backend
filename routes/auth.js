const authController = require('../controllers/auth');

module.exports = router => {
  router.post("/login", authController.Login);

  router.post("/register", authController.Register);

  return router;
};
