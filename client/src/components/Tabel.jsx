import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import React, { useState } from "react";



const Tabel = ({ data, columns, roles }) => {
  
  const [page, setPage] = useState(0);
  const [rowPage, setRowPage] = useState(10);
  const [tableData, setTableData] = useState(data);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPage = (event) => {
    setRowPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, rowIndex, userId) => {
    const rolesName = event.target.value;

    fetch("http://localhost:5000/api/userRoles", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: rolesName, index: userId }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((updatedRole) => {
        const updatedData = [...tableData];
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          role: updatedRole.role_name,
        };
        setTableData(updatedData);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  return (
    <>
      <TableContainer sx={{ minWidth: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  sx={{
                    minWidth: col.minWidth,
                    fontSize: "14px",
                    padding: 1,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowPage, page * rowPage + rowPage)
              .map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      sx={{ fontSize: "14px", padding: 1 }}
                    >
                      {col.id === "image" ? (
                        <img
                          src={`http://localhost:5000/uploads/${row[col.id]}`}
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "cover",
                          }}
                          alt={row[col.id]}
                        />
                      ) : col.id === "role" && roles ? (
                        <Select
                          value={row.role || "User"}
                          onChange={(e) => handleChange(e, rowIndex, row.id)}
                          autoWidth
                        >
                          {roles.map((item) => (
                            <MenuItem
                              key={item.role_name}
                              value={item.role_name}
                            >
                              {item.role_name}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        row[col.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        rowsPerPage={rowPage}
        count={tableData.length}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPage}
        sx={{
          width: "100vw",
          fontSize: "14px",
          padding: 0,
          ml: -2,

          "& .MuiTablePagination-toolbar": {
            padding: 0,
          },
        }}
      />
    </>
  );
};

export default Tabel;
