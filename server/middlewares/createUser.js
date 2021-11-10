const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

const createUser = async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    const user = await User.create({
      name,
      username,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
