const formatDate = dateTime => dateTime ? new Date(dateTime).toLocaleString('he-IL',{ timezone: "Asia/Jerusalem" }) : null; 

module.exports = { formatDate };