import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { Autocomplete, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddFormProduct = ({ openModal, closeModal }) => {
  const [dataCity, setDataCity] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [previewFile, setPreviewFile] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    category: "",
    files: [],
    stok: 0,
    price: 0,
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/city", { method: "GET" })
      .then((response) => response.json())
      .then((datas) => setDataCity(datas.datas));
    fetch("http://localhost:5000/api/category", { method: "GET" })
      .then((response) => response.json())
      .then((result) => setDataCategory(result.datas));
  }, []);
  const clickRemove = (index) => {
    const updateFile = previewFile.filter((_, i) => i !== index);
    setPreviewFile(updateFile);
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      files: e.target.files,
    }));
    const fileUpload = Array.from(e.target.files);
    const filterFile = fileUpload.filter((file) =>
      file.type.startsWith("image/")
    );
    const imageUrls = filterFile.map((file) => ({
      url: URL.createObjectURL(file),
    }));
    setPreviewFile((prevFiles) => [...prevFiles, ...imageUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDatabase = new FormData();
    formDatabase.append("name_product", formData.name);
    formDatabase.append("city", formData.city);
    formDatabase.append("category", formData.category);
    formDatabase.append("price", formData.price);
    formDatabase.append("stok", formData.stok);
    formDatabase.append("deskripsi", formData.description);
    Array.from(formData.files).forEach((file) => {
      formDatabase.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/product", {
        method: "POST",
        body: formDatabase,
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        window.location.reload();
      }
    } catch (err) {
      alert("gagal mengirim data", err);
    }
  };

  const filterOptions = createFilterOptions({ limit: 5 });
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "60%",
      md: "50%",
      lg: "40%",
      xl: "40%",
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={style}>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontSize: "18px", mb: 2 }}
        >
          Tambahkan Produk
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            label="Nama Produk"
            size="small"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            sx={{ mb: 1 }}
          />

          <Autocomplete
            options={dataCity}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.name_city}
            onChange={(event, value) => {
              setFormData((prevState) => ({
                ...prevState,
                city: value ? value.id : null,
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Pilih Kota" size="small" />
            )}
            sx={{ mb: 1 }}
          />
          <Autocomplete
            options={dataCategory}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              setFormData((prevState) => ({
                ...prevState,
                category: value ? value.id : null,
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Pilih Category" size="small" />
            )}
            sx={{ mb: 1 }}
          />

          {previewFile &&
            previewFile.length > 0 &&
            previewFile.map((file, index) => (
              <Box
                sx={{ position: "relative", display: "inline-block", mr: 1 }}
              >
                <img
                  src={file.url}
                  alt={file.name}
                  style={{
                    maxHeight: "50px",
                  }}
                />
                <IconButton
                  onClick={() => clickRemove(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    p: 0,
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          <Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2, mt: 1 }}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                name="files"
                accept="image/*"
                onChange={handleFileChange}
                multiple
              />
            </Button>
          </Box>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs>
              <TextField
                variant="outlined"
                label="Stok"
                type="number"
                size="small"
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    stok: e.target.value,
                  }));
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                variant="outlined"
                label="Price"
                type="number"
                size="small"
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }));
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            label="Deskripsi"
            multiline
            fullWidth
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }));
            }}
            size="small"
            rows={4}
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Tambah
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddFormProduct;
