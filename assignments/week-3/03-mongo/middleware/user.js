const { User } = require("../db");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  User.findOne({ username })
    .then((data) => {
      if (!data || data.password !== password) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      next();
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
}

module.exports = userMiddleware;
