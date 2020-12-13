const cellHandler = cell => {
  if (
    cell.trim() != "" ||
    cell != "undefined" ||
    cell != null ||
    cell != undefined
  ) {
    if (cell.includes("+")) {
      cell = cell.replace("+", "");
    }
    if (cell.includes("-")) {
      cell = cell.replace("-", "");
    }
    if (cell.includes("!")) {
      cell = cell.replace("!", "");
    }
    if (cell.includes("972")) {
      cell = cell.replace("972", "0");
    }
  }
  return cell;
};

module.exports = { cellHandler };