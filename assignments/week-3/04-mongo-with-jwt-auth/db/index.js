const mongoose = require("mongoose");

// Connect to MongoDB
function connectDB() {
  mongoose
    .connect("mongodb://localhost:27017/100xDevCohot_mongo_with_JWT")
    .then(console.log(`Database Connected Successfully`));
}

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  coursesPurchased: Array,
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  image: String,
  published: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
  connectDB,
};
