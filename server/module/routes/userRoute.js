const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dbResponse = require("../../response");
const db = require("../../connections");
const { body, validationResult } = require("express-validator");
const { getAllUser, postUser, myUser } = require("../queries/userQueries");
const { authentication, refreshTokenAut } = require("../../auth/middlewareJwt");
const { createToken,  } = require("../token/token");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY_JWT;

router.post("/Login", (req, res) => {
  const { email, password } = req.body;
  const checkEmail = "SELECT * FROM user WHERE email = ?";
  db.query(checkEmail, [email], (err, result) => {
    if (err) {
      return dbResponse(
        500,
        result,
        "terjadi kesalahan saat memncari data",
        res
      );
    }
    console.log(result);
    const errors = [];
    if (result.length === 0) {
      errors.push({ path: "email", message: "Email tidak ditemukan" });
    }
    const userPassword = result[0];

    if (password !== userPassword.password) {
      errors.push({ path: "password", message: "Password salah" });
    }
    if (errors > 0) {
      return res.json({ errors });
    }
    const insertId = result[0].id;
    console.log(insertId);
    const token = createToken({ insertId });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    console.log("sukses");
    res.status(201).json({ message: "Berhasil Login", isAuthenticated: true });
  });
});

router.get("/user", authentication, (req, res) => {
  const userId = req.insertId;
  myUser(userId, (err, result) => {
    if (err) {
      return dbResponse(500, result, "error mendapatkan user", res);
    }
    dbResponse(201, result, "berhasil mendapatkan user", res);
  });
});

router.post(
  "/users",
  [
    body("name")
      .isLength({ min: 5 })
      .withMessage("jumlah minimal 5 karakter")
      .isLength({ max: 20 })
      .withMessage("jumlah maksimal 20 karakter")
      .notEmpty()
      .withMessage("nama tidak boleh kosong"),
    body("email")
      .isEmail()
      .withMessage("Format email salah")
      .notEmpty()
      .withMessage("email tidak boleh kosong"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("jumlah minimal 8 karakter")
      .isLength({ max: 20 })
      .withMessage("jumlah maksimal 20  karakter")
      .notEmpty()
      .withMessage("password tidak boleh kosong"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    postUser({ name, email, password }, (err, result) => {
      if (err) {
        return dbResponse(500, result, "gagal membuat user", res);
      }

      const insertId = result.insertId;
      const token = createToken({ insertId });
      

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res
        .status(201)
        .json({ message: "User berhasil ditambahkan", isAuthenticated: true });
    });
  }
);
router.get("/auth-user", authentication, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("token");
  res.status(201).json({ message: "Berhasil Logout" });
});
router.get("/users", authentication, (req, res) => {
  getAllUser((err, result) => {
    if (err) {
      return dbResponse(500, result, "error mendapatkan user", res);
    }
    dbResponse(201, result, "berhasil mendapatkan user", res);
  });
});

module.exports = router;
