const db = require("../../connections");

const order = (dataCart, callback) => {
  const { userId, quantity, total, productId } = dataCart;
  const queryCart =
    "INSERT INTO order_product(user_id,product_id,price,quantity) VALUES(?,?,?,?)";
  db.query(queryCart, [userId, productId, total, quantity], callback);
};

const getOrder = (userId, callback) => {
  const queryCart = `SELECT
  op.id,op.user_id,op.quantity,op.price,p.nama_barang,p.stok,p.price,GROUP_CONCAT(DISTINCT
  pi.image_url) AS images_url FROM order_product  AS op JOIN product AS p ON
  op.product_id = p.id  JOIN product_image AS pi ON p.id = pi.product_id WHERE
  op.user_id =${userId}
  GROUP BY op.id,op.user_id,op.quantity,op.price,p.nama_barang,p.stok,p.price`;
  db.query(queryCart, callback);
};

module.exports = { order, getOrder };
