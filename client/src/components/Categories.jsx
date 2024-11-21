import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import React, { useState } from "react";

const Categories = () => {
  const [selectCategory, setSelectCategory] = useState([]);
  const categoriesProduct = [
    "Handphone",
    "Headset",
    "Charger",
    "dan lain-lain",
  ];

  const handleToggleCategory = (category) => {
    if (selectCategory.includes(category)) {
      setSelectCategory(selectCategory.filter((item) => item !== category));
    } else {
      setSelectCategory([...selectCategory, category]);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Kategori Produk
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {categoriesProduct.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleToggleCategory(category)}
            color={selectCategory.includes(category) ? "primary" : "default"}
            variant={selectCategory.includes(category) ? "filled" : "outlined"}
          />
        ))}
      </Box>
      <Button variant="contained" color="primary" sx={{ mt: 4 }}>
        Search
      </Button>
    </Box>
  );
};
export default Categories;
