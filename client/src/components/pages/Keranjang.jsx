import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import WestIcon from "@mui/icons-material/West";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardProduct from "../CardProduct";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDispatch } from "react-redux";
import { setIsDataCart } from "../../redux/InsertId";

const Keranjang = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const [dataCart, setDataCart] = useState();
  const navigate = useNavigate();
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/getCart", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setIsDataCart(data.datas));
        setDataCart(data.datas);
      });
  }, [dispatch]);

  const handleClick = (id) => {
    fetch(`http://localhost:5000/api/deleteCart/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          const updatedCart = dataCart.filter((item) => item.id !== id);
          setDataCart(updatedCart);
          dispatch(setIsDataCart(updatedCart));
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const formatPrice = (price) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "primary",
        }}
      >
        <IconButton onClick={() => navigate("/")}>
          <WestIcon />
        </IconButton>
        <Typography sx={{ ml: 1 }}>Keranjang Belanja</Typography>
      </Box>
      {dataCart && dataCart.length > 0 ? (
        dataCart.map((data) => {
          const parsePrice = data.price;
          const imageArray = data.images_url.split(",")[0];
          return (
            <>
              <Box sx={{ height: "auto", mb: 4 }}>
                <Card sx={{ display: "flex", mt: 2, position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:5000/uploads/${imageArray}`}
                    sx={{ height: "160px", width: "140px" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", lineHeight: 1, mb: 1 }}
                    >
                      {data.nama_barang}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "16px" }}>
                      {formatPrice(parsePrice)}
                    </Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1">Stok {data.stok}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={handleDecrease}
                          sx={{
                            p: 0,
                            minWidth: 0,
                            background: "none",
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <RemoveCircleIcon />
                        </Button>
                        <Typography>{quantity}</Typography>
                        <Button
                          onClick={handleIncrease}
                          sx={{
                            p: 0,
                            minWidth: 0,
                            background: "none",
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <AddCircleIcon />
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                  <IconButton
                    onClick={() => handleClick(data.id)}
                    color="error"
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </Card>
              </Box>
            </>
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
          fullWidth
        >
          <Button variant="contained">Belanja</Button>
        </Box>
      )}
      <Typography sx={{ fontSize: "24px" }}>Rekomendasi Untuk Anda</Typography>
      <CardProduct />
    </Container>
  );
};
export default Keranjang;
