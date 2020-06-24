const formatDate = dateTime => {
    date = dateTime ? new Date(dateTime).toLocaleDateString('he-IL',{ timezone: "Asia/Jerusalem" }) : null;
    time = dateTime ? new Date(dateTime).toLocaleTimeString('he-IL',{ timezone: "Asia/Jerusalem" }) : null;
    if (!date && !time) {
        return null;
    } 
    return date + ' ' + time;
}

module.exports = { formatDate };