const { createASRequest } = require("../controllers/crud/create/create-asr-request");
const { editASR } = require("../controllers/crud/edit/edit");
const { deleteASR } = require("../controllers/crud/delete/delete");

const serviceRequestController = require('../controllers/service-request');

module.exports = router => {

  router.get("/all/open", serviceRequestController.getAllOpen);

  router.get("/all/closed", serviceRequestController.getAllClosed);

  router.post("/create", serviceRequestController.create);

  router.put("/edit", editASR);

  router.post("/delete", serviceRequestController.delete);

  return router;
};
