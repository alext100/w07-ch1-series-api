const chalk = require("chalk");
const debug = require("debug")("series:database");
const mongoose = require("mongoose");

const initializeMongo = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Failed connection with the database"));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.greenBright(`Connected with the database `));
      resolve();
    });
  });

module.exports = initializeMongo;
