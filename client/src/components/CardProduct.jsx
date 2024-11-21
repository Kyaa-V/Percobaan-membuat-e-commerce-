import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CardProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState();

  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/product", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setProductData(data.datas);
        });
    } catch (err) {
      alert("gagal woy");
    }
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h6" sx={{ fontSize: "20px", mt: 2, mb: 1 }}>
          Produk Store
        </Typography>
        <Grid container spacing={1}>
          {productData &&
            productData.length > 0 &&
            productData.map((data) => {
              const images = data.images_url.split(",");
              const firstImage = images[0];

              const formatPrice = (price) => {
                return Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(price);
              };

              return (
                <Grid
                  item
                  xs={6}
                  md={2.5}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    onClick={() => navigate(`/PageProduct/${data.id}`)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textTransform: "none",
                      textAlign: "left",
                      padding: 0,
                    }}
                  >
                    <Card sx={{ width: "100%" }}>
                      <CardMedia
                        component="img"
                        image={`http://localhost:5000/uploads/${firstImage}`}
                        sx={{
                          height: "180px",
                          objectFit: "cover",
                        }}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          flexGrow: 1,
                          padding: 2,
                          textAlign: "left",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "16px", lineHeight: 1, mb: 1 }}
                        >
                          {data.nama_barang}
                        </Typography>
                        <Typography variant="body1" sx={{ color:"orange"}}>
                          {formatPrice(data.price)}
                        </Typography>
                        <Rating name="read-only" value={4} readOnly />
                        <Typography variant="caption">
                          Stok {data.stok}
                        </Typography>
                        <Typography variant="caption">
                          {data.city}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Button>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};
export default CardProduct;
