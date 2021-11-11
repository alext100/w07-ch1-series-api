const Serie = require("../../database/models/serie");
const User = require("../../database/models/user");
const {
  createSerie,
  updateSerie,
  deleteSerie,
  getSeries,
  getViewedSeries,
} = require("./serieController");

describe("Given a createSerie function", () => {
  describe("When it receives a serie", () => {
    test("Then it should invoke res.json() with the serie", async () => {
      const req = {
        body: {
          serie: {
            name: "JoT",
            img: "http://urlofimage.png",
            seen: false,
            platform: "618c2bdc9a1dff86b9be0156",
          },
        },
      };
      const res = {
        json: jest.fn(),
      };

      const serie = req.body;
      Serie.create = jest.fn().mockResolvedValue(serie);

      await createSerie(req, res, null);

      expect(res.json).toHaveBeenCalledWith(serie);
    });
  });

  describe("And Serie.create rejects", () => {
    test("Then it should invoke next function with error rejected with error.code 400", async () => {
      const error = {};
      Serie.create = jest.fn().mockRejectedValue(error);
      const req = {
        body: {
          serie: {
            name: "JoT",
            img: "http://urlofimage.png",
            seen: false,
            platform: "618c2bdc9a1dff86b9be0156",
          },
        },
      };
      const res = {};
      const next = jest.fn();

      await createSerie(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error.code).toBe(400);
    });
  });
});

describe("Given an updateSerie function", () => {
  describe("When it receives an updated serie", () => {
    test("Then it should invoke res.json with this serie", async () => {
      const updatedSerie = {
        id: "6185c1af9f1964f08e62d131",
        name: "Cuéntame...",
        img: "url.jpg",
        seen: false,
        platform: "618c2bdc9a1dff86b9be0156",
      };
      const req = {
        body: updatedSerie,
      };
      const { id } = req.body;
      console.log("id: ", id);
      const res = {
        json: jest.fn(),
      };

      Serie.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedSerie);
      await updateSerie(req, res, null);

      expect(res.json).toHaveBeenCalledWith(updatedSerie);
    });
  });

  describe("When it receives a non existent serie", () => {
    test("Then it should invoke a next function with a 404 error", async () => {
      Serie.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          id: "6222d83be45c3a8801f1440d",
        },
      };
      const next = jest.fn();
      const expectedError = {
        code: 404,
        message: "Serie not found",
      };

      await updateSerie(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});

describe("Given a deleteSerie function", () => {
  describe("When it receives a request with an id of a serie", () => {
    test("Then it should invoke Serie.findByIdAndDelete with that id", async () => {
      Serie.findByIdAndDelete = jest.fn().mockResolvedValue({});
      const idSerie = "618c2bdc9a1dff86b9be0156";
      const req = {
        params: {
          idSerie,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await deleteSerie(req, res, next);

      expect(Serie.findByIdAndDelete).toHaveBeenCalledWith(idSerie);
    });
  });

  describe("And Serie.findByIdAndDelete rejects", () => {
    test("Then it should invoke a next function with the error rejected", async () => {
      const error = {};
      Serie.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idSerie: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteSerie(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a getSeries function", () => {
  describe("When it receives an object user in request", () => {
    test("Then it should invoke the method json with user.serie", async () => {
      const serie = [
        {
          name: "Allí abajo",
          img: "url.jpg",
          seen: false,
          platform: "618c2bdc9a1dff86b9be0156",
        },
        {
          name: "JoT",
          img: "url.png",
          seen: false,
          platform: "618c2bdc9a1dff86b9be0156",
        },
      ];
      const user = {
        username: "Joan",
      };
      User.findOne = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(serie),
      });
      const req = {
        body: { user },
      };
      const res = {
        json: jest.fn(),
      };

      await getSeries(req, res);

      expect(User.findOne).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(user.serie);
    });
  });
});

describe("Given a getViewedSeries function", () => {
  describe("When it receives viewedSeries from Serie.find", () => {
    test("Then it should invoke res.json with viewedSeries", async () => {
      const viewevSeries = {
        name: "Allí abajo",
        img: "url.jpg",
        seen: true,
        platform: "618c2bdc9a1dff86b9be0156",
        id: "618d459eb93d5b6d7cfc9fd8",
      };
      Serie.find = jest.fn().mockResolvedValue(viewevSeries);
      const res = {
        json: jest.fn(),
      };

      await getViewedSeries(null, res, null);

      expect(res.json).toHaveBeenCalledWith(viewevSeries);
    });
  });

  describe("When the Serie.find rejects", () => {
    test("Then it should invoke a next function with the error rejected", async () => {
      const error = {};
      Serie.find = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          seen: true,
        },
      };
      const res = {};
      const next = jest.fn();

      await getViewedSeries(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
