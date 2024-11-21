import { Container, Typography, Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const NameProduct = ({ dataNameProduct, setIsOpen }) => {
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);

  const handleClick = (id) => {
    alert("cek");
    fetch("http://localhost:5000/api/postCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsDisable(data.isDisable);
        alert(data.isDisable);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const formatPrice = (price) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <Container sx={{ mt: 2 }}>
      {dataNameProduct &&
        dataNameProduct.map((data) => {
          const parsePrice = parseInt(data.price);

          return (
            <Box key={data.id}>
              <Typography
                variant="h5"
                sx={{ lineHeight: "1", color: "#ff5722" }}
              >
                {formatPrice(parsePrice)}
              </Typography>
              <Typography variant="caption">{data.name_city}</Typography>
              <Typography variant="body1" sx={{ fontSize: "24px" }}>
                {data.nama_barang}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                Stok {data.stok}
              </Typography>
              <Box>
                <Button
                  onClick={() => navigate(`/Category/${data.category_name}`)}
                  sx={{
                    width: "100%",
                    color: "black",
                    textTransform: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: "18px" }}>
                    Kategori
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {data.category_name}
                    <KeyboardArrowRightIcon />
                  </Typography>
                </Button>
              </Box>
              <Box>
                <Button
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    my: 3,
                    justifyContent: "flex-start",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "red",
                      borderRadius: "50%",
                      overflow: "hidden",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${data.image_url}`}
                      alt={data.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography>{data.name}</Typography>
                </Button>
              </Box>
              <Box sx={{ width: "100%", my: 3 }}>
                <Typography sx={{ textAlign: "center", fontSize: "24px" }}>
                  Deskripsi
                </Typography>
                <Typography>{data.deskripsi}</Typography>
              </Box>
              <Box sx={{ position: "sticky", bottom: 0, mt: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleClick(data.id)}
                      sx={{
                        backgroundColor: isDisable ? "grey" : "orange",

                        color: "white",
                        borderRadius: 0,
                        padding: "8px",
                        width: "100%",
                        "&:hover": {
                          backgroundColor: "darkorange",
                        },
                      }}
                      disabled={isDisable}
                    >
                      <AddShoppingCartOutlinedIcon />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={setIsOpen}
                      variant="contained"
                      sx={{
                        ml: 0,
                        padding: "8px",
                        borderRadius: 0,
                        boxShadow: 0,
                      }}
                    >
                      Beli Sekarang
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          );
        })}
    </Container>
  );
};

export default NameProduct;
