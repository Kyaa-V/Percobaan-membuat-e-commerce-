import { Modal, Box, Button, Typography } from "@mui/material";

const LogOut = ({ openModal, closeModal }) => {
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

  const handleClick = () => {
    fetch("http://localhost:5000/api/Logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) =>{
        
        window.location.reload();
      } );
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={style}>
        <Typography
          sx={{
            textAlign: "center",
            lineHeight: 1,
            fontSize: "24px",
            fontWeight: 500,
            mb: 3,
          }}
        >
          Apakah anda ingin Logout
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{ px: 3, py: 1, backgroundColor: "red" }}
            onClick={() => closeModal(false)}
          >
            Tidak
          </Button>
          <Button
            variant="contained"
            sx={{ px: 3, py: 1, backgroundColor: "green" }}
            onClick={handleClick}
          >
            Ya
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default LogOut;
