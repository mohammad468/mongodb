const mongoose = require("mongoose", { useNewUrlParser: true });

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db not connected", err);
  });
