const Platform = require("../../database/models/platform");
const {
  createPlatform,
  getPlatform,
  deletePlatform,
} = require("./platformController");

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

describe("Given a deletePlatform function", () => {
  describe("When it receives a request with a platform id", () => {
    test("Then it should invoke the method json with the corresponsive platform id", async () => {
      const idPlatform = 443;
      const req = {
        params: {
          idPlatform,
        },
      };
      const result = {
        id: 443,
      };
      const res = {
        json: jest.fn().mockResolvedValue(result),
      };

      Platform.findByIdAndDelete = jest.fn().mockResolvedValue(idPlatform);
      await deletePlatform(req, res);

      expect(res.json).toHaveBeenCalledWith(result);
    });
  });
  describe("When it receives a request with a bad platform id", () => {
    test("Then it should invoke the next function with 404 status", async () => {
      const idPlatform = 443;
      const req = {
        params: {
          idPlatform,
        },
      };

      const error = new Error("Platform not found");
      error.code = 404;

      const res = {};
      const next = jest.fn();
      Platform.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      await deletePlatform(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a rejected promise", () => {
    test("Then it should invoke the next function with an error", async () => {
      const idPlatform = 443;
      const req = {
        params: {
          idPlatform,
        },
      };

      Platform.findByIdAndDelete = jest.fn().mockRejectedValue();
      const next = jest.fn();

      await deletePlatform(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
