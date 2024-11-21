const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY_JWT;
const REFRESH_KEY_JWT = process.env.REFRESH_KEY_JWT;

const createToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};



module.exports = { createToken,  };
