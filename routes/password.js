const { isAuth } = require('../middleware/index');
const passwordController = require('../controllers/password');

module.exports = router => {
  
  
  router.post("/key", passwordController.key);
  
  router.post("/reset", passwordController.reset);
  
  router.put("/update", isAuth, passwordController.update);

  return router;
};
