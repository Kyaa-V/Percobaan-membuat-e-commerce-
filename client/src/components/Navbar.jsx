import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";

const Navbar = ({ open, refTableUser }) => {
  const isAuthenticated = useSelector((state) => state.insertIds.insertUserId);
  const dataCart = useSelector((state) => state.insertIds.isDataCart);

  const navigate = useNavigate();
  const [showWidthDashboard, setShowWidthDashboard] = useState("0px");
  const [showOpacityDashboard, setShowOpacityDashboard] = useState("0");

  const navbarRef = useRef(null);
  const dashboardRef = useRef(null);

  const closeDashboard = () => {
    setShowWidthDashboard("0px");
    setShowOpacityDashboard("0");
  };

  const handleDashboard = () => {
    setShowWidthDashboard((prevWidth) =>
      prevWidth === "0px" ? "240px" : "0px"
    );
    setShowOpacityDashboard((prevOpacity) => (prevOpacity === "0" ? "1" : "0"));
  };

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      dashboardRef.current &&
      !dashboardRef.current.contains(event.target)
    ) {
      setShowWidthDashboard("0px");
      setShowOpacityDashboard("0");
    }
  };

  useEffect(() => {
    if (showWidthDashboard === "240px") {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWidthDashboard, dataCart]);

  return (
    <>
      <AppBar position="sticky" sx={{ maxWidth: "100%" }} ref={navbarRef}>
        <Toolbar>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "100%",
            }}
          >
            <Grid
              item
              xs={8.8}
              md={10.5}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isAuthenticated ? (
                <IconButton
                  sx={{ color: "white", ml: -1 }}
                  onClick={handleDashboard}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
              ) : null}
              <Typography>Terserah</Typography>
            </Grid>

            {isAuthenticated ? (
              <Grid item sx={{ display: "flex" }}>
                <IconButton
                  onClick={() => navigate("/Cart")}
                  sx={{ color: "white" }}
                >
                  <Badge badgeContent={dataCart ? dataCart.length :null} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>

                <IconButton sx={{ color: "white" }}>
                  <Badge badgeContent={17} color="error">
                    <ChatBubbleOutlineOutlinedIcon />
                  </Badge>
                </IconButton>
              </Grid>
            ) : (
              <Grid item xs>
                <Button
                  variant="contained"
                  onClick={open}
                  sx={{ backgroundColor: "darkorange", boxShadow: 0 }}
                >
                  Login
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Dashboard
        width={showWidthDashboard}
        opacity={showOpacityDashboard}
        ref={dashboardRef}
        refTableUser={refTableUser}
        closeDashboard={closeDashboard}
        sx={{
          pointerEvents: showWidthDashboard === "0px" ? "none" : "auto",
        }}
      />
    </>
  );
};

export default Navbar;
