const e = require('express');

const remap = async (status, email) => {
  const  { Op, fn, col } = require('sequelize');
  const { formatDate } = require("./format-dates");
  const ASR = require("../../../models/ASR");
  const BLOB = require("../../../models/Blob");
  const CHANGE_LOG = require("../../../models/Change_log");
  let serviceReq, query;
  if (email) {
    query = { status: status, email: email };
  } else {
    query = { status: status };
  }

  serviceReq = await ASR.findAll({
    where: query,
    order: [["id", "DESC"]],
    attributes: [
      ["id", "srId"],
      "title",
      "description",
      ["name_open", "name"],
      ["email_open", "emailAddress"],
      ["phone_open","phoneNumber"],
      ["problem_type", "mainCategory"],
      ["problem_sub_type", "subCategory"],
      ["module_klh_name", "klhModule"],
      ["impact_name", "affection"],
      ["status_name", "status"],
      ["closeStatusName", "closedStatus"],
      ["insert_time", "requestTime"],
      "dateToIssue",
      "close_time",
      "root_problem",
      "mvcBLOB.blobName",
      "mvcBLOB.containerName",
      "solution",
      // "mvcCHANGE_LOGs.edited_by",
      // "mvcCHANGE_LOGs.date_edited",
      // ["mvcCHANGE_LOGs.id", "logs_id"]
      // [fn('max',col("mvcCHANGE_LOGs.id")), "max_id"]
    ],
  //   group: ["mvcASR.id",
  //   "title",
  //   "description",
  //   ["name_open", "name"],
  //   ["email_open", "emailAddress"],
  //   ["problem_type", "mainCategory"],
  //   ["problem_sub_type", "subCategory"],
  //   ["module_klh_name", "klhModule"],
  //   ["impact_name", "affection"],
  //   ["status_name", "status"],
  //   ["closeStatusName", "closedStatus"],
  //   "insert_time",
  //   "dateToIssue",
  //   "close_time",
  //   "root_problem",
  //   "mvcBLOB.blobName",
  //   "mvcBLOB.containerName",
  //   "solution",
  //   "mvcCHANGE_LOGs.edited_by",
  //   "mvcCHANGE_LOGs.date_edited",
  //   ["mvcCHANGE_LOGs.id", "logs_id"]
  // ],
    include: [
      { model: BLOB, attributes: [] },
      // { model: CHANGE_LOG, attributes: [["id", "log_id"]] },
    ] ,raw: true
  });

  const asrIDS = [...new Set(serviceReq.map(s => s.srId))];

  
  
  
  serviceReq.map(sr => {
    sr.requestTime = formatDate(sr.insert_time);
    sr.dateToIssue = formatDate(sr.dateToIssue);
    sr.close_time = formatDate(sr.close_time);
    sr.edited_by = null
    // sr.date_edited = formatDate(sr.date_edited);
    // sr.log_id = sr["mvcCHANGE_LOGs.log_id"];
  })
  
  const logs = await CHANGE_LOG.findAll({ 
    where: { srId: asrIDS, new_value: '3' }, 
    attributes: ['srId', [fn('max', col('id')),'id']], group: ["srId"], 
    raw: true })

    const logIDS = [...new Set(logs.map(l => l.id))];

  
  const correctLOGS = await CHANGE_LOG.findAll({ where: {id: logIDS } , raw: true })
    

  for (let i = 0; i < serviceReq.length; i++) {
    for (let j = 0; j < correctLOGS.length; j++) {
      if (serviceReq[i].srId == correctLOGS[j].srId) {
        serviceReq[i].edited_by = correctLOGS[j].edited_by;
      }
    }
  }
  
  return serviceReq;
};

module.exports = { remap };
