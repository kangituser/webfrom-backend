const remap = async (status, email) => {
  const  { fn, col } = require('sequelize');
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
    ] ,raw: true
  });

  serviceReq.map(sr => {
    sr.requestTime = formatDate(sr.requestTime);
    sr.dateToIssue = formatDate(sr.dateToIssue);
    sr.close_time = formatDate(sr.close_time);
    delete sr["mvcCHANGE_LOGs.date_edited"];
  })

  for (let i = 0; i < serviceReq.length-1; i++) {
    while (serviceReq[i].srId == serviceReq[i+1].srId) {
      for (let j = i; j < serviceReq.length-1;) {
        serviceReq.splice(j,1); 
        j++;
      }
    }
  }

  serviceReq.map(sr => {
    if (sr.new_value != 3 && sr.old_value != 3 || sr.new_value != 0 && sr.old_value != 3) {
      sr.edited_by = null;
    }
    delete sr.new_value;
    delete sr.old_value;
    delete sr.latest_id;
  })
  
  return serviceReq;
};

module.exports = { remap };
