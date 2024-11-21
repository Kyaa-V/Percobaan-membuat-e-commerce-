const express = require("express");
const router = express.Router();
const db = require("../../connections");

const { authentication } = require("../../auth/middlewareJwt");
const dbResponse = require("../../response");
const { postCart, getCart, deleteCart } = require("../queries/cartQuery");

module.exports = (io) => {
  router.post("/postCart", authentication, (req, res) => {
    const userId = req.insertId;
    const { id } = req.body;
    console.log(id);
    console.log(userId);
    postCart({ userId, id }, (err, result) => {
      if (err) {
        return dbResponse(500, null, "Gagal mengambil data", res);
      }

      res.status(201).json({ isDisable: true });
      getCart(userId, (err, result) => {
        if (err) {
          return dbResponse(500, null, "Gagal mengambil data", res);
        }
        console.log(result);
        io.emit("cart_updated", result);
       
      });
    });
  });

  router.get("/getCart", authentication, (req, res) => {
    const userId = req.insertId;
    getCart(userId, (err, result) => {
      if (err) {
        return dbResponse(500, null, "Gagal mengambil data", res);
      }
      console.log(result);
      dbResponse(201, result, "berhasil mengambil cart", res);
    });
  });

  router.delete("/deleteCart/:id", authentication, (req, res) => {
    const id = req.params.id;
    const userId = req.insertId;
    deleteCart({ id, userId }, (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Error deleting item" });
      }
      console.log(result);

      res.send({ success: true, message: "Item deleted successfully" });
    });
  });
  return router;
};
