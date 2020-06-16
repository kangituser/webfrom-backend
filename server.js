if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");

const { sequelize } = require("./util/database");

const userRoutes = require("./routes/user");
const serviceRequestRoutes = require("./routes/service-request");

const app = express();

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/service-request", serviceRequestRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", `POST ,GET ,OPTIONS, PUT, PATCH, DELETE, ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, PROPFIND, PROPPATCH, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL`);
  res.setHeader("Access-Control-Allow-Headers", `Content-Type , Authorization ,Cache-Control, multipart/form-data , application/json ,text/plain, text/html, Overwrite, Destination, Depth, User-Agent, Translate, Range, Content-Range, Timeout, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Location, Lock-Token, If`);
  res.setHeader("Access-Control-Expose-Headers", "DAV, content-length, Allow")
  if (req.method == "OPTIONS") {
    return res.status(200);
  }
  next();
});

const PORT = process.env.PORT || 8080;
// sequelize.sync({ force: true })
// sequelize.sync({ alter: true })
sequelize
  .sync({ alter: false })
  .then(() => {
    app.listen(PORT, console.log(`started server on port ${PORT}`));
    console.log("synced to azure srdb");
  })
  .catch((err) => console.log(err));
