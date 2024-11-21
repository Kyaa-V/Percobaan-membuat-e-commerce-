import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton, Badge } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { setIsDataProduct } from "../redux/InsertId";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NameProduct from "./NameProduct";
import { useSelector } from "react-redux";

const Product = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { index } = useParams();
  const [dataProduct, setDataProduct] = useState(null);
  const [dataNameProduct, setDataNameProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const dataCart = useSelector((state) => state.insertIds.isDataCart);
  
  useEffect(() => {
   
    try {
      fetch(`http://localhost:5000/api/getProduct/${index}`)
        .then((response) => response.json())
        .then((data) => {
          setDataNameProduct(data.datas);
          dispatch(setIsDataProduct(data.datas));
          const imagesArray = data.datas
            .map((result) => {
              return result.image_url.split(",");
            })
            .flat();
          setDataProduct(imagesArray);
          setSelectedImage(`http://localhost:5000/uploads/${imagesArray[0]}`);
        });
    } catch (err) {
      alert("gagal woy error mampus lu");
    }
  }, [index, dispatch]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(`http://localhost:5000/uploads/${image}`);
  };

  const navigate = useNavigate();

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
          <IconButton onClick={() => navigate("/Cart")}>
            <Badge badgeContent={dataCart ? dataCart.length : null} color="error">
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
      <Box sx={{ width: "100%", height: "40vh" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={2} sx={{ height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {dataProduct &&
                dataProduct.length > 0 &&
                dataProduct.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => handleThumbnailClick(image)}
                    sx={{
                      mb: 1,
                      maxHeight: "50px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        selectedImage ===
                        `http://localhost:5000/uploads/${image}`
                          ? "2px solid #1976d2"
                          : "2px solid transparent",
                      borderRadius: 1,
                    }}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${image}`}
                      alt={`Thumbnail ${index}`}
                      style={{
                        width: "100%",
                        borderRadius: "4px",
                        minHeight: "100%",
                      }}
                    />
                  </Box>
                ))}
            </Box>
          </Grid>
          <Grid item xs={10} sx={{ height: "100%" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <NameProduct dataNameProduct={dataNameProduct} setIsOpen={setOpen} />
    </>
  );
};

export default Product;
