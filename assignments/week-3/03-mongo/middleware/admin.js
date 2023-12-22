const { Admin } = require("../db");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  Admin.findOne({ username })
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

module.exports = adminMiddleware;
