const remap = require("./remap-data");

const {
  setStateToDelete,
  updateStateToDelete,
  deleteServiceRequest,
} = require("./delete");

const {
  setStateToCreate,
  createBlob,
  mapServiceRequest,
  findKLHEmails,
  createServiceRequest,
} = require("./create");

const {
  setStateToEdit,
  updateStatetoError,
  updateStateToEdit,
  findServiceRequestById,
  getSubCategoryName,
  getStatusName,
  getCloseStatus,
  sendToLog,
  sendServiceRequestEditedEmail,
} = require("./edit");

const updateServiceRequest = require("./main-edit");

const {
  findCategories,
  findImpact,
  findStateById,
  findKLHModule,
} = require("./queries");

module.exports = {
  findCategories,
  findImpact,
  findStateById,
  findKLHModule,
  remap,
  setStateToDelete,
  updateStateToDelete,
  deleteServiceRequest,
  setStateToCreate,
  createBlob,
  mapServiceRequest,
  findKLHEmails,
  createServiceRequest,
  setStateToEdit,
  updateStatetoError,
  updateStateToEdit,
  findServiceRequestById,
  updateServiceRequest,
  getSubCategoryName,
  getStatusName,
  getCloseStatus,
  sendToLog,
  sendServiceRequestEditedEmail,
};
