if (process.env.NODE_ENV == "development") {
}
require("dotenv/config");

const middleware = require("./middleware/index.js");
const db = require("./models/Utils/database");
const PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();

const { isAuth } = require('./middleware/index');

const authRouter = require('./routes/auth')(express.Router());
const passwordRouter = require('./routes/password')(express.Router());
const userRouter = require("./routes/user")(express.Router());
const serviceRequestRouter = require("./routes/service-request")(express.Router());

app.use(middleware.cors);
app.use(express.json());

app.use("/user/auth", authRouter);
app.use("/user/password", passwordRouter);
app.use(isAuth);
app.use("/service-request", serviceRequestRouter);
app.use("/user", userRouter);

app.use(middleware._error);


db.sync({ alter: false }).then(() => {
  app.listen(PORT, console.log(`started server on port ${PORT}`));
  console.log(`connected to ${process.env.DATABASE}`);
}).catch(err => console.log(err));
