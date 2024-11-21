import { Container, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsRole } from "../../redux/InsertId";
import { useState } from "react";

const CreateStore = () => {
  const dispatch = useDispatch();
  const [nameStore, setNameStore] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/createStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameStore }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setIsRole(data.isRole));

        window.location.replace("/");
      });
  };

  return (
    <Container
      fullWidth
      sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
    >
      <Typography sx={{ textAlign: "center", fontSize: "24px", mt: 2, mb: 3 }}>
        Buat Toko
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nama toko"
          fullWidth
          size="small"
          onChange={(e) => setNameStore(e.target.value)}
        ></TextField>
        <Button variant="contained" type="submit">
          Buat
        </Button>
      </form>
    </Container>
  );
};
export default CreateStore;
