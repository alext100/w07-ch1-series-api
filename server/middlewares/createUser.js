const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

const createUser = async (req, res, next) => {
  const { name, username, password, admin } = req.body;
  try {
    const user = await User.create({
      name,
      username,
      password: await bcrypt.hash(password, 10),
      admin,
    });
    res.json(user);
    console.log(user);
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
