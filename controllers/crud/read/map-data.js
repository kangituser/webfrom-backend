const remapData = async data => { 
  const { formatDate } = require('./format-dates');
  const { whiteSpaces } = require('./trim');
    let formattedData = [];
    data.forEach(el => {
      formattedData.push({
        srId: el.id,
        requestTime: formatDate(el.insert_time),
        name: el.name_open,
        phoneNumber: el.phone_open,
        emailAddress: el.email_open,
        mainCategory: el.problem_type,
        subCategory: whiteSpaces(el.problem_sub_type),
        klhModule: el.module_klh_name,
        title: el.title,
        description: el.description,
        affection: el.impact_name,
        status: el.status_name,
        solution: el.solution,
        root_problem: el.root_problem,
        closedStatus: el.closeStatusName,
        dateToIssue: formatDate(el.dateToIssue),
        close_time: formatDate(el.close_time),
        blobName: '',
        containerName: ''
      })
    });  
    return formattedData;
  }

module.exports = { remapData };