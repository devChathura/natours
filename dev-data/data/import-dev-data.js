const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

// DATABASE CONNECTION
dotenv.config({ path: './config.env' });
const DB_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => console.log('DB connection successful!'));

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error('Error occurred while loading data:', err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error('Error occurred while deleting data:', err);
  }
  process.exit();
};

// EXECUTE IMPORT OR DELETE FUNCTION BASED ON COMMAND-LINE ARGUMENT
// When you run a command in the terminal, Node.js stores every part of that command in an array called process.argv. The first element (index 0) is the path to the Node.js executable, and the second element (index 1) is the path to the JavaScript file being executed. Any additional arguments you provide will be stored in subsequent elements of the array.
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
