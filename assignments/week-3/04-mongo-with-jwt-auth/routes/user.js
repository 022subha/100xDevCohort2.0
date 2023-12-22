const { Router } = require("express");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

const router = Router();
const jwtSecret = "64gsjbdhfvfjk";

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;

  User.create({ username, password })
    .then(() => {
      return res.status(200).json({ message: "User created successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!username) {
        return res.status(404).json({ message: "User not found" });
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

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find()
    .then((courses) => {
      return res.status(200).json({ courses });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  Course.findById(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({ mesasage: "Course not found." });
      }

      User.findOne({ username: req.user.username })
        .then((user) => {
          user.coursesPurchased.push(course._id);
          user
            .save()
            .then(() => {
              return res
                .status(200)
                .json({ message: "Course Purchased Successfully." });
            })
            .catch((err) => {
              return res.status(500).json({ message: err.mesasage });
            });
        })
        .catch((err) => {
          return res.status(500).json({ message: err.mesasage });
        });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  User.findOne({ username: req.user.username })
    .then((data) => {
      data.coursesPurchased.forEach((item) => {
        let purchasedCourses = [];
        Course.findById(item)
          .then((course) => {
            purchasedCourses.push({
              title: course.title,
              description: course.description,
              price: course.price,
              imageLink: course.image,
              published: course.published,
            });
          })
          .then(() => {
            return res.status(200).json({ purchasedCourses });
          });
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

module.exports = router;
