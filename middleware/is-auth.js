const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];

    let decodedToken;

    if (!authHeader) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    decodedToken = JWT.verify(token, process.env.SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    req.id = decodedToken.userId;
    next();
  } catch (err) {
    next(err)
  }
};
