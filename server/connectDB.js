const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Succesful Connection to DB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
