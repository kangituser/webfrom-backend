const formatDate = dateTime => dateTime ? new Date(dateTime).getTime() : null; 

module.exports = { formatDate };