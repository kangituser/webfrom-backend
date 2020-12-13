const { isAuth } = require('../middleware/index');
const passwordController = require('../controllers/password');

module.exports = router => {
  
  router.put("/update", isAuth, passwordController.update);

  router.post("/key", passwordController.key);

  router.post("/reset", passwordController.reset);

  return router;
};
