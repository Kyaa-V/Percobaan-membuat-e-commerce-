const express = require("express");
const router = express.Router();
const dbResponse = require("../../response");
const { authentication } = require("../../auth/middlewareJwt");
const upload = require("../../storage");
const SECRET_PASSWORD = process.env.SECRET_KEY_JWT;
const {
  postProduct,
  postCityProduct,
  getAllProduct,
  postCategoryProduct,
  insertProductImages,
  getProduct,
  userProduct,
} = require("../queries/productQueries");
require("dotenv").config();

router.post("/product", authentication, async (req, res) => {
  const insertId = req.insertId;
  console.log(insertId);
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("gagal upload file");
      }

      const { name_product, city, category, price, stok, deskripsi } = req.body;
      console.log(city);
      console.log(category);
      const files = req.files;
      const parsePrice = parseInt(price, 10);
      const parseStok = parseInt(stok, 10);

      try {
        const productResult = await postProduct({
          name_product,
          deskripsi,
          price: parsePrice,
          stok: parseStok,
          insertUser_id: insertId,
        });
        const insertProductId = productResult.insertId;

        console.log("Product inserted:", productResult);

        await postCategoryProduct({ insertProductId, category });
        console.log("Product-Category relationship inserted");

        await postCityProduct({ city, insertProductId });
        console.log("Product-City relationship inserted");

        if (files && files.length > 0) {
          const imageResult = await insertProductImages(insertProductId, files);
          console.log("Images inserted:", imageResult);
        } else {
          return dbResponse(
            500,
            null,
            "gagal membuat produk, tidak ada file",
            res
          );
        }

        return dbResponse(201, productResult, "Product berhasil dibuat", res);
      } catch (dbErr) {
        console.log("Database error:", dbErr);
        return dbResponse(500, dbErr, "gagal", res);
      }
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("Unexpected error");
  }
});

router.get("/product", (req, res) => {
  getAllProduct((err, result) => {
    dbResponse(201, result, "berhasil fetch data", res);
  });
});
router.get("/getProduct/:index", (req, res) => {
  const { index } = req.params;
  getProduct(index, (err, result) => {
   console.log(err);
    console.log(result);
    dbResponse(201, result, "berhasil fetch data", res);
    
  });
});

router.get("/userProduct", authentication, (req, res) => {
  const userId = req.insertId;
  userProduct(userId, (err, result) => {
    dbResponse(201, result, "berhasil fetch data", res);
  });
});

module.exports = router;
