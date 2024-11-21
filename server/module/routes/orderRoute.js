const express = require("express");
const router = express.Router();
const db = require("../../connections");
const { authentication } = require("../../auth/middlewareJwt");
const dbResponse = require("../../response");
const { order, getOrder } = require("../queries/orderQuery");

router.post("/Order", authentication, (req, res) => {
  const userId = req.insertId;
  const { quantity, total, productId } = req.body;
  console.log("userId", userId);
  console.log("quantity", quantity);
  console.log("total", total);
  console.log("productId", productId);
  order({ userId, quantity, total, productId }, (err, result) => {
    console.log(result);
    if (err) {
      return dbResponse(500, result, "error mendapatkan user", res);
    }
    dbResponse(201, result, "berhasil mendapatkan user", res);
  });
});

router.get("/getOrder", authentication, (req, res) => {
  const userId = req.insertId;
  getOrder(userId, (err, result) => {
    if (err) {
      return dbResponse(500, null, "Gagal mengambil data", res);
    }
    dbResponse(201, result, "berhasil mendapatkan cart", res);
  });
});

module.exports = router;
