const { Op } = require('sequelize');
const BLOB = require('../../models/Blob');
const ASR = require('../../models/ASR');
 
const findAllBlobs = async () => await BLOB.findAll({ raw: true });

const findBlobById = async srId => await BLOB.findOne({ where: { srId: srId }});

// const findAllBlobsByIdList = async list => await BLOB.findAll({ where: { srId: list}, raw: true })
const findAllBlobsByIdList = async list => await BLOB.findAll({ 
    where: { srId: list }, 
    attributes: ['blobName', 'containerName'], 
    order: [["id", "DESC"]] , 
    include: [ASR], 
    raw: true 
})

module.exports = { findAllBlobs, findBlobById, findAllBlobsByIdList };