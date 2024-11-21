const db = require("../../connections");

const postCart = (data, callback) => {
  const { userId, id } = data;
  const queryCart = `INSERT INTO
  cart(user_id,product_id) VALUES(?,?)`;
  db.query(queryCart, [userId, id], callback);
};
const getCart = (userId, callback) => {
  const queryCart = `SELECT
  c.id,c.user_id,c.quantity,c.price AS total,p.nama_barang,p.stok,p.price,GROUP_CONCAT(DISTINCT
  pi.image_url) AS images_url FROM cart  AS c JOIN product AS p ON
  c.product_id = p.id  JOIN product_image AS pi ON p.id = pi.product_id WHERE
  c.user_id =${userId}
  GROUP BY c.id,c.user_id,c.quantity,c.price,p.nama_barang,p.stok,p.price`;
  db.query(queryCart, callback);
};

const deleteCart = (data, callback) => {
  const { id, userId } = data;
  const queryDeleteCart = `DELETE FROM cart WHERE user_id =${userId} AND id
  =${id}`;
  db.query(queryDeleteCart, callback);
};

module.exports = { postCart, getCart, deleteCart };
