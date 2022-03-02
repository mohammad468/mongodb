const { string } = require("joi");

const mongoose = require("mongoose", { useNewUrlParser: true });

mongoose
  .connect("mongodb://localhost:27017/courseDb")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db not connected", err);
  });

const schemaCourse = new mongoose.Schema({
  name: { type: String, required: true },
  tags: [String],
  teacher: String,
  publishDate: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

// Number
// string
// Date
// boolean
// binary
// ObjectID
//Array

const CourseModel = mongoose.model("course", schemaCourse);

const newCourse = new CourseModel({
  name: "nodejs crash course",
  tags: ["nodejs", "javascript", "backend"],
  teacher: "mohammad mohseni",
  completed: true,
});

// newCourse
//   .save()
//   .then((res) => {
//     console.log("saved", res);
//   })
//   .catch((err) => {
//     console.log("not saved", err);
//   });

async function getCourseList() {
  const courseList = await CourseModel.find()
    .limit(3)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courseList);
}

getCourseList();
