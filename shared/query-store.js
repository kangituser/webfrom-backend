const USER = require("../models/user");
const BLOB = require("../models/Blob");
const STATE = require("../models/state");
const ASR = require("../models/ASR");
const { Op } = require("sequelize");

const findUserByEmail = async email => await USER.findOne({ where: { email: email }, raw: true });

const findSingleUserByEmail = async email => await USER.findOne({ where: { email: email }});

const findUserById = async id => await USER.findOne({ where: { id: id }})

const findUserRoleById = async id => await USER.findOne({ where: { id: id}, attributes: ['role']})

const findAllBlobs = async () => await BLOB.findAll({ raw: true });

const findBlobById = async id => await BLOB.findOne({ where: { srId: id } });

const findState = async srId => await STATE.findOne({ where: { srId: srId } });

const findASRById = async srId => await ASR.findOne({ where: { id: srId } }); 

const findAllOpenASR = async (userId, res) => {
  let asr;
  try {    
    const authUser = await findUserById(userId);    
    if (authUser.role === 1 || authUser.role === 2) {
      // asr = await ASR.findAll({ where: { status: {[Op.ne]: 3} }, raw: true });
      asr = await ASR.findAll({ where: { status: [1,2,4,5,6]}, raw: true, order: [['id', 'DESC']]});     
    } else {
      asr = await ASR.findAll({ where: { email_open: {[Op.eq] : authUser.email}, status: [1,2,4,5,6] } , raw: true, order: [['id', 'DESC']]});
    }
    
    let mappedASR = await remapData(asr);
    const serviceReq = await mergeBLOBwithASR(mappedASR);
    
    res.status(200).json({ serviceReq: serviceReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const findAllClosedASR = async (userId, res) => {
  let asr;
  try {
    const authUser = await findUserById(userId);    
    
    if (authUser.role === 1 || authUser.role === 2) {
      asr = await ASR.findAll({ where: {status: {[Op.eq]: 3}} , raw: true, order: [['id', 'DESC']]});      
      // asr = await ASR.findAll({ where: {status: 3} , raw: true});      
    } else {
      // asr = await ASR.findAll({ [Op.and]: [{ status: 3 }, { userEmail: authUser.email}] , raw: true});
      asr = await ASR.findAll({ where: { status: {[Op.eq]: 3} , email_open: authUser.email } , raw: true, order: [['id', 'DESC']] });    
    }
    let mappedASR = await remapData(asr);    
    // const serviceReq = await mergeBLOBwithASR(mappedASR.filter((sr) => sr.status === 3), await findAllBlobs())    
    const serviceReq = await mergeBLOBwithASR(mappedASR);
    res.status(200).json({ serviceReq: serviceReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const remapData = async (data) => {
  let formattedData = [];
  data.forEach(el => {
    formattedData.push({
      srId: el.id,
      requestTime: `${el.insert_time.toISOString().split('T')[0]} ${el.insert_time.toISOString().split('T')[1].slice(0,8)}`,
      name: el.name_open,
      phoneNumber: el.phone_open,
      emailAddress: el.email_open,
      mainCategory: el.problem_type,
      subCategory: el.problem_sub_type,
      klhModule: el.module_klh_name,
      title: el.title,
      description: el.description,
      affection: el.impact_name,
      status: el.status_name,
      solution: el.solution,
      root_problem: el.root_problem,
    })
  });  
  return formattedData;
}

// const mergeBLOBwithASR = async (sr, blob) => {   
const mergeBLOBwithASR = async (sr) => {   
  let merged = [];  
  const blob = await BLOB.findAll({ raw: true });
  
  for (let i = 0; i < blob.length; i++) {
    for (let j = 0; j < sr.length; j++) {
      if (blob[i].srId === sr[j].srId) {
        let obj = { ...sr[j], blobName: blob[i].blobName, containerName: blob[i].containerName };        
        merged.push(obj);
      }
    }
  }

  merged.sort((a,b) => {
    return b.srId - a.srId
  })

  return merged;
}

module.exports = { findUserByEmail, findState, findBlobById, findASRById, findUserById, findAllOpenASR, findAllClosedASR, findSingleUserByEmail, findUserRoleById };