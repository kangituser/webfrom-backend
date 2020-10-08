const CLOSE_STATUS = require('../../../models/close-status');

const remap = async (status, email) => {
  const  { fn, col } = require('sequelize');
  const { formatDate } = require("./format-dates");
  const ASR = require("../../../models/ASR");
  const BLOB = require("../../../models/Blob");
  const CHANGE_LOG = require("../../../models/Change_log");
  let serviceReq, query;
  if (email) {
    query = { status: status, email_open: email };
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
      ["closeStatusId","closedStatus"],
      "mvcCLOSE_STATUS.statusName",
      "dateToIssue",
      "close_time",
      "root_problem",
      "solution",
      "mvcBLOB.blobName",
      "mvcBLOB.containerName",
      "mvcCHANGE_LOGs.edited_by",
      "mvcCHANGE_LOGs.new_value",
      "mvcCHANGE_LOGs.old_value",
      [fn('max', col('mvcCHANGE_LOGs.id')), 'latest_id']
    ],
    group: [
      ["mvcASR.id", "srId"],
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
      ["closeStatusId","closedStatus"],
      "mvcCLOSE_STATUS.statusName",
      "dateToIssue",
      "close_time",
      "root_problem",
      "solution",
      "mvcBLOB.blobName",
      "mvcBLOB.containerName",
      "mvcCHANGE_LOGs.edited_by",
      "mvcCHANGE_LOGs.id",
      "mvcCHANGE_LOGs.new_value",
      "mvcCHANGE_LOGs.old_value",
    ],
    include: [
      { model: BLOB, attributes: [] },
      { model: CHANGE_LOG, attributes: [] },
      { model: CLOSE_STATUS, attributes: []}
      
    ] ,raw: true
  });

  serviceReq.map(sr => {
    sr.requestTime = formatDate(sr.requestTime);
    sr.dateToIssue = formatDate(sr.dateToIssue);
    sr.close_time = formatDate(sr.close_time);
    sr.closed_by = sr.edited_by;
    delete sr["mvcCHANGE_LOGs.date_edited"];
  })
  
  serviceReq.map(sr => {
    if (sr.new_value != 3) {
      sr.edited_by = null;
    }
    delete sr.new_value;
    delete sr.old_value;
    delete sr.latest_id;
    delete sr.edited_by;
  })

  const mapped = [];

  for (let i = 0; i < serviceReq.length; i++) {
    if (i < serviceReq.length -1) {
      if (serviceReq[i].srId == serviceReq[i+1].srId) {
        continue;
      } else {
        mapped.push(serviceReq[i]);
      }
    } else {
      mapped.push(serviceReq[i]);
    }
  }
  
  return mapped;
 };

module.exports = { remap };
