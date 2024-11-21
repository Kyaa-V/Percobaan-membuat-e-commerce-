import { Grid, Box, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { IconButton, Badge } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useNavigate, useParams } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
const Category = () => {
  const navigate = useNavigate();
  const { index } = useParams();
  const [dataCategory, setDataCategory] = useState(null);
  const [getCategory, setGetCategory] = useState(null);
  const [borderCategory, setBorderCategory] = useState();
setBorderCategory(index);
  useEffect(() => {
    fetch("http://localhost:5000/api/category")
      .then((response) => response.json())
      .then((data) => {
        setGetCategory(data.datas);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/api/category/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setDataCategory(data.datas);
      });
  }, [index]);

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "primary",
              mb: 2,
            }}
          >
            <IconButton onClick={() => navigate("/")}>
              <WestIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item sx={{ display: "flex" }}>
          <IconButton onClick={() => navigate("/Keranjang")}>
            <Badge badgeContent={17} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          <IconButton>
            <Badge badgeContent={17} color="error">
              <ChatBubbleOutlineOutlinedIcon />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            mr: 1,
            backgroundColor: "red",
            minHeight: "100vh",
            px: 2,
            py: 1,
          }}
        >
          {getCategory &&
            getCategory.map((result) => (
              <Box
                sx={{
                  borderRadius: "5px",
                  p: 1,
                  mb: 1,
                  border:
                    borderCategory === result.name
                      ? "2px solid #1976d2"
                      : "2px solid transparent",
                  maxWidth: "80px",
                  width: "80px",
                }}
                onClick={() => navigate(`/Category/${result.name}`)}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "600", color: "white" }}
                >
                  {result.name}
                </Typography>
              </Box>
            ))}
        </Box>
        <Grid container sx={{ mt: 1 }}>
          {dataCategory &&
            dataCategory.map((data) => {
              const image = data.images_url.split(",")[0];
              const priceInt = parseInt(data.price);
              const formatPrice = (price) => {
                Intl.NumberFormat("id-ID", {
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
                    gap: 1,
                    mb: 1,
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    onClick={() => navigate(`/PageProduct/${data.product_id}`)}
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
                        image={`http://localhost:5000/uploads/${image}`}
                        sx={{
                          height: "120px",
                          objectFit: "cover",
                          mb: -1,
                        }}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          flexGrow: 1,
                          textAlign: "left",
                        }}
                      >
                        <Typography sx={{ fontSize: "16px", lineHeight: 1 }}>
                          {data.nama_barang}
                        </Typography>
                        <Typography variant="body" sx={{ fontSize: "15px" }}>
                          {formatPrice(priceInt)}
                        </Typography>
                        <Rating
                          name="read-only"
                          value={4}
                          readOnly
                          sx={{ fontSize: "15px" }}
                        />
                        <Typography variant="caption" sx={{ fontSize: "13px" }}>
                          Stok {data.stok}
                        </Typography>
                        <Typography variant="caption">
                          {data.name_city}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Button>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default Category;
