const express = require("express");
const router = express.Router();
const dbResponse = require("../../response");
const { authentication } = require("../../auth/middlewareJwt");
const db = require("../../connections");
const {
  getCity,
  getCategory,
  setCategory,
  updateStore,
} = require("../queries/queryGet");

router.post("/createStore", authentication, (req, res) => {
  const insertId = req.insertId;
  const { nameStore } = req.body;
  
  updateStore({ insertId, nameStore }, (err, result) => {
    if (err) {
      return dbResponse(500, result, "gagal mengambil data", res);
    }
    res.status(200).json({ message: "Berhasil membuat Toko",isRole:true });
  });
});

router.get("/city", (req, res) => {
  getCity((err, result) => {
    if (err) {
      return dbResponse(500, result, "gagal mengambil data", res);
    }
    dbResponse(200, result, "berhasil", res);
  });
});
router.get("/category", (req, res) => {
  getCategory((err, result) => {
    if (err) {
      return dbResponse(500, result, "gagal mengambil data", res);
    }
    dbResponse(200, result, "berhasil", res);
  });
});
router.get("/category/:index", (req, res) => {
  const { index } = req.params;
  setCategory(index, (err, result) => {
    if (err) {
      return dbResponse(500, result, "gagal mengambil data", res);
    }
    dbResponse(200, result, "berhasil", res);
  });
});

module.exports = router;
