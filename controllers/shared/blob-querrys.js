const BLOB = require('../../models/Blob');
 
const findAllBlobs = async () => await BLOB.findAll({ raw: true });

module.exports = { findAllBlobs };