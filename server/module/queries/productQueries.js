const db = require("../../connections");
const util = require("util");
const dbQuery = util.promisify(db.query).bind(db);

const postProduct = async (productData) => {
  const queryProduct =
    "INSERT INTO product(nama_barang, deskripsi, price, stok, user_id) VALUES(?,?,?,?,?)";
  const { name_product, deskripsi, price, stok, insertUser_id } = productData;
  return dbQuery(queryProduct, [
    name_product,
    deskripsi,
    price,
    stok,
    insertUser_id,
  ]);
};

const postCategoryProduct = async (categoryData) => {
  const queryCategoryProduct =
    "INSERT INTO product_categories(product_id,category_id) VALUES(?,?)";
  const { insertProductId, category } = categoryData;
  return dbQuery(queryCategoryProduct, [insertProductId, category]);
};

const postCityProduct = async (cityData) => {
  const queryCityProduct =
    "INSERT INTO product_city(city_id, product_id) VALUES(?, ?)";
  const { city, insertProductId } = cityData;
  return dbQuery(queryCityProduct, [city, insertProductId]);
};

const insertProductImages = async (productId, files) => {
  const sqlFile =
    "INSERT INTO product_image(product_id, image_url) VALUES(?,?)";
  const tasks = files.map((file) => {
    return dbQuery(sqlFile, [productId, file.filename]);
  });
  return Promise.all(tasks);
};

const getAllProduct = (callback) => {
  const queryAllProduct =
    "SELECT  p.id,p.nama_barang,p.price,p.stok,c.name AS kategori,GROUP_CONCAT(DISTINCT pi.image_url) AS images_url, ci.name_city AS city,p.at_created FROM product AS p JOIN product_categories AS pc ON (p.id = pc.product_id) JOIN categories AS c ON(pc.category_id = c.id) JOIN product_image AS pi ON (p.id= pi.product_id) JOIN product_city AS pci ON (p.id  = pci.product_id) JOIN cities AS ci ON (pci.city_id = ci.id) GROUP BY p.id,p.nama_barang,p.price,p.stok,c.name,ci.name_city,p.at_created";

  db.query(queryAllProduct, callback);
};
const getProduct = (index, callback) => {
  const queryGetProduct = `SELECT us.name,p.id, p.nama_barang, p.price, p.stok,p.deskripsi,
  c.name AS category_name, GROUP_CONCAT(DISTINCT pi.image_url) AS image_url, 
  ci.name_city FROM product AS p
  JOIN product_categories AS pc ON p.id = pc.product_id 
  JOIN categories AS c ON pc.category_id = c.id
  JOIN product_image AS pi ON p.id = pi.product_id 
  JOIN product_city AS pci ON p.id = pci.product_id 
  JOIN cities AS ci ON pci.city_id = ci.id 
JOIN user AS us ON p.user_id = us.id
WHERE p.id = ${index}
  GROUP BY us.name,p.id, p.nama_barang, p.price, p.stok,p.deskripsi, c.name, ci.name_city`;

  db.query(queryGetProduct, [index], callback);
};

const userProduct = (userId, callback) => {
  const queryUserProduct = `SELECT 
    user.id,
    user.name, 
    p.nama_barang, 
    p.price, 
    p.stok, 
p.at_created,
    c.name AS category, 
    GROUP_CONCAT(DISTINCT pi.image_url) AS images_url, 
    cities.name_city  AS city
FROM 
    user 
JOIN product AS p ON user.id = p.user_id 
JOIN product_categories AS pc ON p.id = pc.product_id 
JOIN categories AS c ON pc.category_id = c.id 
JOIN product_image AS pi ON p.id = pi.product_id 
JOIN product_city AS pci ON p.id = pci.product_id 
JOIN cities ON pci.city_id = cities.id
WHERE user.id =${userId}
GROUP BY 
    user.id, 
    user.name, 
    p.nama_barang, 
    p.price, 
    p.stok, 
p.at_created,
    c.name, 
    cities.name_city;`;
  db.query(queryUserProduct, callback);
};

module.exports = {
  postProduct,
  postCityProduct,
  postCategoryProduct,
  insertProductImages,
  getAllProduct,
  getProduct,
  userProduct,
};
