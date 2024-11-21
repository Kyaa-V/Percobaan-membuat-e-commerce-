const db = require("../../connections");

const getAllUser = (callback) => {
  const query =
    "SELECT u.id,u.name,u.email,u.password,u.at_created,r.role_name  AS role FROM user AS u JOIN roles AS r ON (u.role_id = r.id )";
  db.query(query, callback);
};
const postUser = (userData, callback) => {
  const query = "INSERT INTO user(name, email, password) VALUES (?, ?, ?)";
  const { name, email, password } = userData;
  db.query(query, [name, email, password], callback);
};
const myUser = (userId, callback) => {
  const queryMyUser = `SELECT * FROM user WHERE id =${userId}`;
  db.query(queryMyUser,callback)
};
module.exports = { getAllUser, postUser, myUser };
