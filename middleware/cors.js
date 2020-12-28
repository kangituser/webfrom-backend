module.exports = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", `POST ,GET ,OPTIONS, PUT, PATCH, DELETE`);
  res.setHeader("Access-Control-Allow-Headers", `Content-Type , Authorization ,Cache-Control, multipart/form-data , application/json ,text/plain, text/html`);
  if (req.method == "OPTIONS") {
    return res.status(200);
  }
  next();
};