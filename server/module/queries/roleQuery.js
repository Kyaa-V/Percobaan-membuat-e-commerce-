const db = require("../../connections");

const roles = (callback) => {
  const queryRoles = "SELECT * FROM roles";
  db.query(queryRoles, callback);
};
const rolesUser = (rolesData, callback) => {
  const { index, roleId } = rolesData;
  const queryRoleUser = "UPDATE user SET role_id = ? WHERE id = ?";
  db.query(queryRoleUser, [roleId, index], callback);
};
const checkRole = (userId, callback) => {
  const queryCheckRole = `SELECT r.role_name  FROM user AS u JOIN roles AS r ON (u.role_id = r.id ) 
WHERE u.id = ${userId}`;
  db.query(queryCheckRole, callback);
};
module.exports = { roles, rolesUser, checkRole };
