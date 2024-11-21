import Tabel from "../Tabel";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const TableUser = ({ refTableUser }) => {
  const [user, setUser] = useState([]);
  const [rolesName, setRolesName] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/users", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        
        setUser(data.datas);
      });

    fetch("http://localhost:5000/api/roles", {
      method: "GET",
      credentials: "include",
    }).then((response) => response.json()).then((data)=>setRolesName(data.datas))
  }, [refTableUser]);

  const columns = [
    {
      id: "id",
      label: "id",
      align: "left",
      minWidth: "30px",
    },
    {
      id: "name",
      label: "name",
      align: "left",
      minWidth: "80px",
    },
    {
      id: "email",
      label: "email",
      align: "left",
      minWidth: "150px",
    },
    {
      id: "password",
      label: "password",
      align: "left",
      minWidth: "150px",
    },
    {
      id: "at_created",
      label: "at_created",
      align: "left",
      minWidth: "150px",
    },
    {
      id: "role",
      label: "role",
      align: "left",
      minWidth: "100px",
    },
  ];

  return (
    <>
      {user && user.length > 0 ? (
        <Tabel columns={columns} data={user} roles={rolesName} />
      ) : (
        <Typography>Anda tidak punya sama sekali produk</Typography>
      )}
    </>
  );
};
export default TableUser;
