const { createASRequest } = require('./create-helpers');
const { deleteASRequest } = require('./delete-helpers');
const { editASRequest } = require('./edit-helpers');
const { findAllOpenASR, findAllClosedASR } = require("../../shared/query-store");
const USER = require('../../models/user');

const createASR = async (req, res, next) => {
  createASRequest(req, res);
};

const editASR = async (req, res, next) => {    
  const body = req.body; 
  const id = req.id;
  const originalUrl = req.originalUrl;
  const user = await USER.findOne({ where: { id: id }});  
  if (user.role === 1) {
    editASRequest(body, user, originalUrl, res);
  } else {
    res.status(422).json({ message: 'unauthorized user '});    
  }
};

const deleteASR = async (req, res, next) => {
  const srId = req.body.srId;
  const user = await USER.findOne({ where: { id: req.id }});  
  if (user.role === 1) {
    deleteASRequest(srId, res);
  } else {
    res.status(422).send({ message: 'unauthorized user '});
  }
};


const GetOpenASRs = (req, res, next) => {
  findAllOpenASR(req.id, res);
};

const GetClosedASRs = (req, res, next) => {
  findAllClosedASR(req.id, res);
};

module.exports = { createASR, editASR, deleteASR, GetOpenASRs, GetClosedASRs };