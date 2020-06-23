const remapData = async data => {
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
        closedStatus: el.closeStatusName,
        dateToIssue: new Date(el.dateToIssue).toLocaleDateString('he-IL',{ timezone: "Asia/Jerusalem" })    
      })
    });  
    return formattedData;
  }

module.exports = { remapData };