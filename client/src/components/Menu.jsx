import WidgetsIcon from "@mui/icons-material/Widgets";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";

const Menu = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <WidgetsIcon fontSize="large" />
          </IconButton>
          <Typography sx={{ fontSize: "14px" }}>Menu</Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <WidgetsIcon fontSize="large" />
          </IconButton>
          <Typography sx={{ fontSize: "14px" }}>Menu</Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <WidgetsIcon fontSize="large" />
          </IconButton>
          <Typography sx={{ fontSize: "14px" }}>Menu</Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <WidgetsIcon fontSize="large" />
          </IconButton>
          <Typography sx={{ fontSize: "14px" }}>Menu</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Menu;
