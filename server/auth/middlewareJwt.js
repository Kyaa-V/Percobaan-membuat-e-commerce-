const jwt = require("jsonwebtoken");
const { createToken, refreshToken } = require("../module/token/token");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY_JWT;


const authentication = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token tidak ditemukan", isAuthenticated: false });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token error: ", err);
      return res
        .status(403)
        .json({ message: "Token tidak valid", isAuthenticated: false });
    }
    console.log(decoded.insertId);
    console.log("sukses verify token");
    req.insertId = decoded.insertId;
    next();
  });
};


module.exports = { authentication,  };
