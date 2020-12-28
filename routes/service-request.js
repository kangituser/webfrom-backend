const serviceRequestController = require('../controllers/service-request');

module.exports = router => {

  router.get("/all/open", serviceRequestController.getAllOpen);

  router.get("/all/closed", serviceRequestController.getAllClosed);

  router.post("/create", serviceRequestController.create);

  router.put("/edit", serviceRequestController.edit);

  router.post("/delete", serviceRequestController.delete);

  return router;
};
