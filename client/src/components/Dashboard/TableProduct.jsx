import { Typography, Container } from "@mui/material";
import Tabel from "../Tabel";
import AddFormProduct from "../Form/AddFormProduct";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";

const TableProduct = () => {
  const [open, setOpen] = useState(false);
  const [dataUserProduct, setDataUserProduct] = useState();
  useEffect(() => {
    
    fetch("http://localhost:5000/api/userProduct", {
      method: "GET",
      
    })
      .then((response) => response.json())
      .then((data) => {
        setDataUserProduct(data.datas);
      });
  }, []);

  const columns = [
    {
      id: "user",
      label: "user",
      align: "left",
      minWidth: "80px",
    },
    {
      id: "image",
      label: "image",
      align: "left",
      minWidth: "80px",
    },
    {
      id: "nama_barang",
      label: "nama barang",
      align: "left",
      minWidth: "150px",
    },
    {
      id: "price",
      label: "price",
      align: "left",
      minWidth: "150px",
    },
    {
      id: "stok",
      label: "stok",
      align: "left",
      minWidth: "150px",
    },
    {
      id: "kategori",
      label: "kategori",
      align: "left",
      minWidth: "150px",
    },
    {
      id: "city",
      label: "kota",
      align: "left",
      minWidth: "150px",
    },
    {
      id: "at_created",
      label: "at_created",
      align: "left",
      minWidth: "150px",
    },
  ];

  return (
    <Container>
      <Typography variant="h6" sx={{ fontSize: "18px", my: 1 }}>
        Tabel Product
      </Typography>
      <Typography variant="caption" sx={{ lineHeight: 1 }}>
        Kamu bisa menambahkan, Mengedit, Menghapus, Mencari produk di Tabel
        bawah ini;
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton sx={{ color: "blue" }} onClick={() => setOpen(true)}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Box>
      </Typography>
      <AddFormProduct openModal={open} closeModal={() => setOpen(false)} />
      {dataUserProduct && dataUserProduct.length > 0 ? (
        <Tabel
          data={dataUserProduct.map((result) => {
            const images = result.images_url.split(",")[0];

            return {
              id: result.id,
              user: result.name,
              nama_barang: result.nama_barang,
              price: result.price,
              stok: result.stok,
              kategori: result.category,
              image: images,
              city: result.city,
              at_created: result.at_created,
            };
          })}
          columns={columns}
        />
      ) : (
        <Typography>Anda tidak punya sama sekali produk</Typography>
      )}
    </Container>
  );
};
export default TableProduct;
