const { col, fn } = require("sequelize");
const formatDate = require("./fomat-date");
const ASR = require("../../models/ASR");
const BLOB = require("../../models/Blob");
const CHANGE_LOG = require("../../models/Change_log");
const CLOSE_STATUS = require("../../models/close-status");

module.exports = async (status, email_open) => {
  try {
    let serviceReq;
    serviceReq = await ASR.findAll({
      where: email_open ? { status, email_open } : { status },
      order: [["id", "DESC"]],
      attributes: [
        ["id", "srId"],
        "title",
        "description",
        ["name_open", "name"],
        ["email_open", "emailAddress"],
        ["phone_open", "phoneNumber"],
        ["problem_type", "mainCategory"],
        ["problem_sub_type", "subCategory"],
        ["module_klh_name", "klhModule"],
        ["impact_name", "affection"],
        ["status_name", "status"],
        ["insert_time", "requestTime"],
        [col("mvcCLOSE_STATUS.statusName"), "closedStatus"],
        "dateToIssue",
        "close_time",
        "root_problem",
        "solution",
        "mvcBLOB.blobName",
        "mvcBLOB.containerName",
        [col("mvcCHANGE_LOGs.edited_by"), "closed_by"],
        "mvcCHANGE_LOGs.new_value",
        "mvcCHANGE_LOGs.old_value",
        [fn("max", col("mvcCHANGE_LOGs.id")), "latest_id"],
      ],
      group: [
        ["mvcASR.id", "srId"],
        "title",
        "description",
        ["name_open", "name"],
        ["email_open", "emailAddress"],
        ["phone_open", "phoneNumber"],
        ["problem_type", "mainCategory"],
        ["problem_sub_type", "subCategory"],
        ["module_klh_name", "klhModule"],
        ["impact_name", "affection"],
        ["status_name", "status"],
        ["insert_time", "requestTime"],
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
        { model: CLOSE_STATUS, attributes: [] },
      ],
      raw: true,
    });

    console.log(serviceReq);

    serviceReq.map(sr => {
      sr.requestTime = formatDate(sr.requestTime);
      sr.dateToIssue = formatDate(sr.dateToIssue);
      sr.close_time = formatDate(sr.close_time);

      if (sr.new_value != 3) {
        sr.edited_by = null;
        sr.closed_by = null;
      }
      delete sr.new_value;
      delete sr.old_value;
      delete sr.latest_id;
      delete sr.edited_by;
    });

    const mapped = [];

    for (let i = 0; i < serviceReq.length; i++) {
      if (i < serviceReq.length - 1) {
        if (serviceReq[i].srId == serviceReq[i + 1].srId) {
          continue;
        } else {
          mapped.push(serviceReq[i]);
        }
      } else {
        mapped.push(serviceReq[i]);
      }
    }

    return mapped;
  } catch (err) {
    throw err;
  }
};
