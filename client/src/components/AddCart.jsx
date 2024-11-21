import { Box, Typography, Button, Modal, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AddCart = ({ openModal, closeModal }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [productId, setProductId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const dataProduct = useSelector((state) => state.insertIds.isDataProduct);

  useEffect(() => {
    if (dataProduct && dataProduct.length > 0) {
      const selectProduct = dataProduct[0];
      const parsePrice = parseInt(selectProduct.price);
      setProductId(selectProduct.id);
      setTotal(parsePrice * quantity);
    }
    const imgArray = dataProduct
      .map((result) => {
        return result.image_url.split(",");
      })
      .flat();
    setSelectedImage(`http://localhost:5000/uploads/${imgArray[0]}`);
  }, [openModal, quantity, dataProduct]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    fetch("http://localhost:5000/api/Order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity, total, productId }),
      credentials: "include",
    }).then((response) => {
      response.json();
      closeModal();
    });
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Container
        sx={{
          maxHeight: "50vh",
          height: "100%",
          minWidth: "100vw",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        }}
      >
        {dataProduct &&
          dataProduct.map((result, index) => {
            const parsePrice = parseInt(result.price);
            const formatPrice = (price) => {
              return Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price);
            };

            const handleThumbnailClick = (image) => {
              setSelectedImage(`http://localhost:5000/uploads/${image}`);
            };

            const imageArray = result.image_url.split(",");

            return (
              <>
                <Box
                  sx={{
                    height: "50%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    m: 1,
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      maxWidth: "120px",
                      minWidth: "120px",
                      mr: 1,
                    }}
                  >
                    <img
                      src={selectedImage}
                      alt="product"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      height: "100%",
                    }}
                  >
                    <Typography>{result.nama_barang}</Typography>
                    <Typography>{formatPrice(parsePrice)}</Typography>
                    <Typography>Stok {result.stok}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: 2,
                        flexDirection: "row",
                      }}
                    >
                      {imageArray.map((image, index) => (
                        <Box
                          key={index}
                          onClick={() => handleThumbnailClick(image)}
                          sx={{
                            mb: 1,

                            maxHeight: "30px",
                            height: "100%",
                            width: "30px",
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
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography>Jumlah</Typography>
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 1,
                    mb: 3,
                    alignItems: "center",
                  }}
                >
                  <Typography>Total</Typography>
                  <Typography>{total}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mr: 2,
                    gap: 2,
                  }}
                >
                  <Button variant="contained" onClick={closeModal}>
                    Batal
                  </Button>
                  <Button variant="contained" onClick={handleAddToCart}>
                    Beli
                  </Button>
                </Box>
              </>
            );
          })}
      </Container>
    </Modal>
  );
};

export default AddCart;
