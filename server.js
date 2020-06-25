if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}

// const ASR = require('./models/ASR');
// const BLOB = require('./models/Blob');
// const BLOB_SERVERS = require('./models/Blob_Servers');
// const LOG = require('./models/Change_log');
// const CATEGORIES = require('./models/categories');
// const CLOSE_STATUS = require('./models/close-status');
// const IMPACT = require('./models/impact');
// const KLH_MODULES = require('./models/klhmodules');
// const ML_CAT = require('./models/malfunction_categories');
// const PWD_TOKENS = require('./models/pwdToken');
// const SR_CAT = require('./models/sr_categories');
// const STATE = require('./models/state');
// const STATUS = require('./models/status');
// const TOKEN = require('./models/token');
// const USER = require('./models/user');

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

const { sequelize } = require("./util/database");

const UserRoutes = require("./routes/user");
const SRRoutes = require("./routes/service-request");

const app = express();

app.use(bodyParser.json());

app.use("/user", UserRoutes);
app.use("/service-request", SRRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", `POST ,GET ,OPTIONS, PUT, PATCH, DELETE`);
  res.setHeader("Access-Control-Allow-Headers", `Content-Type , Authorization ,Cache-Control, multipart/form-data , application/json ,text/plain, text/html`);
  if (req.method == "OPTIONS") {
    return res.status(200);
  }
  next();
});

sequelize.sync({ alter: false })
// sequelize.sync({ force: true })
.then(() => {
    app.listen(PORT, console.log(`started server on port ${PORT}`));
    console.log("synced to azure srdb");
}).catch((err) => console.log(err));
