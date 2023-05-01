const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const hashPassword = (plain) => {
  password = bcrypt.hashSync(plain, 10);
  return password;
};

const isloggedIn = async (req, res, next) => {
  const auth_header = req.headers.authorization;
  console.log(auth_header)
  if (!auth_header) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  const token  = auth_header.split(" ")[1];
  console.log(token)

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  req.userId = decoded._id;
  next();
};

module.exports = {
  hashPassword,
  isloggedIn
};
