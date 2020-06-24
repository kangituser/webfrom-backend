const BLOB = require('../../models/Blob');
 
const findAllBlobs = async () => await BLOB.findAll({ raw: true });

const findBlobById = async srId => await BLOB.findOne({ where: { srId: srId }});

module.exports = { findAllBlobs, findBlobById };