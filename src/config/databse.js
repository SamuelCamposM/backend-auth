const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const DB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL ,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('DB is connected');
    
  } catch (error) {
    console.log(error);
    process.exit(1); //si hay error detendra la app
  }
};
DB();

module.exports = DB;
