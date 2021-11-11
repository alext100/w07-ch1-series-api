const mongoose = require("mongoose");
const initializeMongo = require(".");

describe("Given a initializeMongo function", () => {
  describe("When it receives a wrong connectionString", () => {
    test.skip("Then it should to call a callback function with a error and reject", () => {});
    const error = {};
    initializeMongo("qq");
    mongoose.connect = jest.fn().mockRejectedValue(error);

    const reject = jest.fn();
    expect(reject).toHaveBeenCalledWith(error);
  });
});
