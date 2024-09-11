const mongoose = require("mongoose");
let studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z ]{2,20}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid first name`,
    },
    required: [true, "User first name  required"],
  },
  lastName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z ]{2,20}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid last name`,
    },
    required: [true, "User last name  required"],
  },
  age: {
    type: Number,
    min: [18, "You are too young to create account."],
    max: [120, "You are too old to create account."],
    required: true,
  },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["male", "female"],
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email Id!`,
    },
    required: [true, "User email id  required"],
  },
  phoneNumber: String,
});
let Student = new mongoose.model("students", studentSchema);

let saveToDB = async () => {
  try {
    let sumanth = new Student({
      firstName: "Sumanth",
      lastName: "Dondamuri",
      age: "21",
      gender: "Male",
      email: "sumanth@gmail.com",
      phoneNumber: "+91-9999999999",
    });
    //await sumanth.save();
    let pavan = new Student({
      firstName: "Pavan",
      lastName: "Don",
      age: "20",
      gender: "female",
      email: "sumanth@gmail.com",
      phoneNumber: "+91-9999999999",
    });
    let satya = new Student({
      firstName: "Satya",
      lastName: "Don",
      age: "20",
      gender: "male",
      email: "sumanth@gmail.com",
      phoneNumber: "+91-9999999999",
    });
    //await pavan.save();
    Student.insertMany([sumanth, pavan, satya]);
    console.log("Saved to MDB successfully");
  } catch (err) {
    console.log("Unable to save the MDB");
  }
};
let getDataFromDB = async () => {
  let studentsData = await Student.find();
  console.log(studentSchema);
};

let connectToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sumanthdps:sumanth@mern2406.9fvsa.mongodb.net/batch2406students?retryWrites=true&w=majority&appName=Mern2406"
    );
    console.log("Successfully connected to MDB");
    saveToDB();
    getDataFromDB();
  } catch (err) {
    console.log("Unable to connect to MDB");
    console.log(err);
  }
};
connectToMDB();
