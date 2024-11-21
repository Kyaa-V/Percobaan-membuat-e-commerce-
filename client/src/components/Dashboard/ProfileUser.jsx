import { Container, Box, Typography, Button, TextField } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const ProfileUser = () => {
  const navigate = useNavigate();
  const isRole = useSelector((state) => state.insertIds.isRole);
  const myUser = useSelector((state) => state.insertIds.isDataMyUser);

  return (
    <Container>
      <Box
        fullWidth
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ ml: 1, fontSize: "28px", textAlign: "center" }}
        >
          Ubah profile
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
          mb: 3,
        }}
      >
        <Button
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            p: 0,
            backgroundColor: "yellow",
            overflow: "hidden",
          }}
        >
          <img
            src="your-image-url"
            alt="profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Button>
      </Box>

      {myUser &&
        myUser.map((data, index) => (
          <Box
            key={index}
            fullWidth
            sx={{ display: "flex", gap: 1, flexDirection: "column", mb: 2 }}
          >
            <TextField
              label="Nama"
              fullWidth
              size="small"
              defaultValue={data.name}
            />
            <TextField
              label="Email"
              fullWidth
              size="small"
              defaultValue={data.email}
            />
            <TextField
              label="No.telp"
              fullWidth
              size="small"
              defaultValue={data.phone || ""}
            />

            {!isRole ? (
              <Box>
                <Button
                  onClick={() => navigate("/CreateStore")}
                  sx={{
                    width: "100%",
                    color: "black",
                    textTransform: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <StoreIcon fontSize="large" />
                    <Typography variant="body1" sx={{ fontSize: "18px" }}>
                      Buat Toko
                    </Typography>
                  </Box>
                  <KeyboardArrowRightIcon />
                </Button>
              </Box>
            ) : (
              <TextField
                label="Nama Toko"
                fullWidth
                size="small"
                defaultValue={data.name_store || ""}
              />
            )}
          </Box>
        ))}
    </Container>
  );
};

export default ProfileUser;
