// const formatDate = dateTime => dateTime ? new Date(dateTime).toLocaleString('he-IL',{ timezone: "Asia/Jerusalem" }) : null; 
const formatDate = dateTime => dateTime ? new Date(dateTime).getTime() : null; 

module.exports = { formatDate };