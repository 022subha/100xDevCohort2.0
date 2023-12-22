const jwt = require("jsonwebtoken");
const { User } = require("../db");

const jwtSecret = "64gsjbdhfvfjk";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const authToken = req.headers["authorization"];
  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authToken.split(" ")[1];

  const decoded = jwt.verify(token, jwtSecret);

  User.findById(decoded._id)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user;
      next();
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
}

module.exports = userMiddleware;
