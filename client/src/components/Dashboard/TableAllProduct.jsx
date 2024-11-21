import Tabel from "../Tabel";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const TableAllProduct = () => {
  const [dataProduct, setDataPoduct] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/product")
      .then((response) => response.json())
      .then((data) => setDataPoduct(data.datas));
  }, []);
  const columns = [
    {
      id: "id",
      label: "id",
      align: "left",
      minWidth: "30px",
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
      <Typography>Tabel semua product</Typography>

      {dataProduct && dataProduct.length > 0 ? (
        <Tabel
          data={dataProduct.map((result) => {
            const images = result.images_url.split(",")[0];

            return {
              id: result.id,
              nama_barang: result.nama_barang,
              price: result.price,
              stok: result.stok,
              kategori:result.kategori,
              image: images,
              city: result.city,
              at_created: result.at_created,
            };
          })}
          columns={columns}
        />
      ) : <Typography>Anda tidak punya sama sekali produk</Typography>}
    </Container>
  );
};
export default TableAllProduct;
