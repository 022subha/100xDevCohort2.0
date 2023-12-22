const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");

const router = Router();
const jwtSecret = "64gsjbdhfvfjk";

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  Admin.create({ username, password })
    .then(() => {
      return res.status(200).json({ message: "Admin created successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  Admin.findOne({ username })
    .then((user) => {
      if (!username) {
        return res.status(404).json({ message: "Admin not found" });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ _id: user._id }, jwtSecret);
      return res.status(200).json({ token });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;

  Course.create({
    title,
    description,
    price,
    image: imageLink,
    published: true,
  })
    .then((data) => {
      return res.status(200).json({
        message: "Course created successfully",
        courseId: data._id,
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find()
    .then((courses) => {
      return res.status(200).json({ courses });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

module.exports = router;
