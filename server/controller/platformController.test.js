const Platform = require("../../database/models/platform");
const createPlatform = require("./platformController");

jest.mock("../../database/models/platform");

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
    test("Then it should invoke next function with error rejected", async () => {
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
    });
  });
});
