const remap = require("./remap-data");

const {
  setStateToDelete,
  updateStateToDelete,
  findStateById,
  deleteServiceRequest,
} = require("./delete");

const {
  setStateToCreate,
  createBlob,
  mapServiceRequest,
  findKLHUsers,
  createServiceRequest,
} = require("./create");

const { findCategories, findImpact, findKLHModule } = require("./queries");

module.exports = {
  remap,
  setStateToDelete,
  updateStateToDelete,
  findStateById,
  deleteServiceRequest,
  setStateToCreate,
  createBlob,
  mapServiceRequest,
  findKLHUsers,
  createServiceRequest,
  findCategories,
  findImpact,
  findKLHModule,
};
