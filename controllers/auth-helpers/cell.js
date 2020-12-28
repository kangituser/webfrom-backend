module.exports = cell => {
  if (cell.trim() != "" ||
    cell != "undefined" ||
    cell != null ||
    cell != undefined) {

    if (cell.includes("972")) {
      cell = cell.replace("972", "0");
    }

    ["+", "-", "!"].forEach(symbol => {
      if (cell.includes(symbol)) {
        cell = cell.replace(symbol, "");
      }
    });
  }
  return cell;
};
