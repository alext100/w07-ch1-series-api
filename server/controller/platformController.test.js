const Platform = require("../../database/models/platform");
const createPlatform = require("./platformController");

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
});
