const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const rightPassword = await bcrypt.compare(password, user.password);

  if (!rightPassword) {
    const error = new Error("Password incorrect!");
    error.code = 401;
    next(error);
  } else {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    res.json({ token });
  }
};

module.exports = loginUser;
