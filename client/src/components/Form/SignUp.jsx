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

const SignUp = ({ refreshUser, open, closeSignUp, openLogin }) => {
  const dispatch = useDispatch();
  const [error, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    closeSignUp();
    openLogin();
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    refreshUser();
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const result = await response.json();
      dispatch(setInsertUserId(result.isAuthenticated));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (result.errors) {
        const fieldError = result.errors.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        return setErrors(fieldError);
      }
      window.location.reload();
    } catch (err) {
      alert("gagal");
    }
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
    <Modal open={open} onClose={closeSignUp}>
      <Box sx={style}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontSize: "24px", mt: 1, mb: 3 }}
        >
          SignUp
        </Typography>
        <form onSubmit={handleSubmitForm}>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <TextField
              variant="outlined"
              label=" Nama"
              name="name"
              size="small"
              value={formData.name}
              onChange={handleChange}
              error={!!error.name}
            />
            <FormHelperText error>{error.name}</FormHelperText>
          </FormControl>
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
            sudah punya akun?
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
              Login
            </Button>
          </Typography>

          <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
            Daftar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
export default SignUp;
