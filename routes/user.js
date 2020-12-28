const userController = require('../controllers/user');

module.exports = router => {
  router.get("/all", userController.getAll);

  router.post("/delete", userController.deleteUser);

  router.put("/update", userController.updateUser);

  router.get("/role", userController.getRole);

  return router;
};
