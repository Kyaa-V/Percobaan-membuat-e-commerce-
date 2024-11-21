const db = require("../../connections");

const getCity = (callback) => {
  const query = "SELECT * FROM cities";
  db.query(query, callback);
};
const getCategory = (callback) => {
  const query = "SELECT * FROM categories";
  db.query(query, callback);
};
const setCategory = (index, callback) => {
  const query = `SELECT c.id,c.name AS category,p.id AS product_id ,p.nama_barang,p.price,
  p.stok,ci.name_city,
  GROUP_CONCAT(DISTINCT pi.image_url) AS images_url FROM categories AS c JOIN product_categories AS pc ON 
(c.id = pc.category_id) JOIN product AS p ON (pc.product_id = p.id) JOIN product_image AS pi ON (p.id = pi.product_id)
 JOIN product_city AS pci ON (p.id = pci.product_id) JOIN cities AS ci ON (pci.city_id = ci.id)
WHERE c.name = "${index}"
GROUP BY c.id,c.name,p.id,p.nama_barang,p.price,p.stok,ci.name_city`;
  db.query(query, callback);
};
const updateStore = (data, callback) => {
  const { insertId, nameStore } = data;
  const queryStore = `UPDATE user SET name_store = "${nameStore}" ,role_id = 4
  WHERE id = ${insertId}`;
  db.query(queryStore, callback);
};
module.exports = { getCity, getCategory, setCategory, updateStore };
