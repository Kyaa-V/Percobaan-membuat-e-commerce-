import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInsertUserId } from "../../redux/InsertId";

const Login = ({ openModal, closeModal, openSignUp }) => {
  const dispatch = useDispatch();
  const [error, setErrors] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleClick = () => {
    closeModal();
    openSignUp();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.isAuthenticated);
        dispatch(setInsertUserId(data.isAuthenticated));

        if (data.errors) {
          const fieldError = data.errors.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {});
          setErrors(fieldError);
        }
        window.location.reload();
      });
  };
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
          variant="h5"
          sx={{ textAlign: "center", fontSize: "24px", mt: 1, mb: 3 }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <TextField
              variant="outlined"
              label=" Email"
              name="email"
              size="small"
              value={formData.email}
              onChange={handleChange}
              error={!!error.email}
            />
            <FormHelperText error>{error.email}</FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              label=" Password"
              name="password"
              size="small"
              value={formData.password}
              onChange={handleChange}
              error={!!error.password}
            />
            <FormHelperText error>{error.password}</FormHelperText>
          </FormControl>
          <Typography variant="caption">
            Belum punya akun?
            <Button
              onClick={handleClick}
              sx={{
                textTransform: "none",
                textDecoration: "underline",
                padding: 0,
                minWidth: "auto",
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
              }}
            >
              Daftar
            </Button>
          </Typography>
          <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
export default Login;
