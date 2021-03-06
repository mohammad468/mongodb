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
  price: Number,
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
  name: "ReactJs Pro crash course",
  tags: ["React", "NextJs", "javascript", "frontend"],
  teacher: "mohammad mohseni",
  completed: true,
  price: 300000,
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
  const pageSize = 2;
  const pageNumber = 1; // this want to change for change page
  const courseList = await CourseModel.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  console.log(courseList);
}

// getCourseList();

async function deleteCourse(id) {
  await CourseModel.findByIdAndRemove(id);
}

deleteCourse("621f551029f57ac2a7b09767");

getCourseList();

