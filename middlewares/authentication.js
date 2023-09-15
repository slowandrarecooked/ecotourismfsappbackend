const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (!err) {
      next();
      req.userId = decoded.id;
    } else {
      res.send("Unauthorized");
      console.log(err);
    }
  });
};
module.exports = {
  authentication,
};
