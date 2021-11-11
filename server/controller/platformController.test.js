const Platform = require("../../database/models/platform");
const { createPlatform, getPlatform } = require("./platformController");

jest.mock("../../database/models/platform");

describe("Given a getPlatform function", () => {
  describe("When it receives an array of platforms", () => {
    test("Then it should invoke the method json with the platforms", async () => {
      const platforms = [
        {
          name: "Netflix",
          img: "netflix.jpg",
        },
        {
          name: "HBO",
          img: "hbo.jpg",
        },
      ];
      Platform.find = jest.fn().mockResolvedValue(platforms);
      const res = {
        json: jest.fn(),
      };

      await getPlatform(null, res);

      expect(res.json).toHaveBeenCalledWith(platforms);
    });
  });
  describe("When the promise is rejected", () => {
    test("Then it should invoke next function with the error", async () => {
      Platform.find = jest.fn().mockRejectedValue();
      const next = jest.fn();

      await getPlatform(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
describe("Given a createPlatform function", () => {
  describe("When it receives a platform", () => {
    test("Then it should invoke res.json() with the platform", async () => {
      const req = {
        body: {
          platform: {
            name: "Netflix",
            img: "http://netflix/netflix.png",
          },
        },
      };
      const res = {
        json: jest.fn(),
      };

      const platform = req.body;
      Platform.create = jest.fn().mockResolvedValue(platform);

      await createPlatform(req, res, null);

      expect(res.json).toHaveBeenCalledWith(platform);
    });
  });

  describe("And Platform.create rejects", () => {
    test("Then it should invoke next function with error rejected with error.code 400", async () => {
      const error = {};
      Platform.create = jest.fn().mockRejectedValue(error);
      const req = {
        body: {
          platform: {
            name: "N",
            img: "q",
          },
        },
      };
      const res = {};
      const next = jest.fn();

      await createPlatform(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error.code).toBe(400);
    });
  });
});
