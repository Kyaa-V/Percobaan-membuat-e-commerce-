const express = require("express");
const router = express.Router();
const dbResponse = require("../../response");
const { authentication } = require("../../auth/middlewareJwt");
const { roles, checkRole } = require("../queries/roleQuery");
router.put("/userRoles", (req, res) => {
  const { role, index } = req.body;

  db.query(
    "SELECT id FROM roles WHERE role_name = ?",
    [role],
    (err, result) => {
      if (err) {
        return dbResponse(500, null, "Gagal mengambil data", res);
      }

      if (result.length > 0) {
        const roleId = result[0].id;

        rolesUser({ index, roleId }, (err, result) => {
          if (err) {
            return dbResponse(500, null, "Gagal memperbarui role user", res);
          }
          dbResponse(200, result, "Role user berhasil diperbarui", res);
        });
      } else {
        return res.status(404).json({ message: "Role tidak ditemukan" });
      }
    }
  );
});

router.get("/roles", (req, res) => {
  roles((err, result) => {
    if (err) {
      return dbResponse(500, result, "gagal mengambil data", res);
    }
    dbResponse(200, result, "berhasil", res);
  });
});
router.get("/check-role", authentication, (req, res) => {
  const userId = req.insertId;
  console.log(userId);
  checkRole(userId, (err, result) => {
    if (err) {
      return dbResponse(500, result, "Gagal mengambil data", res);
    }

    const role = result[0].role_name;

    if (role === "User") {
      return res.json({ isRole: false, isAdmin: false });
    }
    if (role === "Store") {
      return res.json({ isRole: true, isAdmin: false });
    }
    if (role === "Admin") {
      return res.json({ isRole: true, isAdmin: true });
    }

    res.status(400).json({ message: "Role tidak valid" });
  });
});

module.exports = router;
