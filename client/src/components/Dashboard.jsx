import Home from "./Home";
import React, { useState, useEffect, forwardRef } from "react";
import {
  IconButton,
  Box,
  Button,
  Typography,
  Container,
  Badge,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PeopleIcon from "@mui/icons-material/People";
import TableAllProduct from "./Dashboard/TableAllProduct";
import TableProduct from "./Dashboard/TableProduct";
import TableUser from "./Dashboard/TableUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProfileUser from "./Dashboard/ProfileUser";
import LogOut from "./Form/LogOut";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsDataMyUser } from "../redux/InsertId";

const Dashboard = forwardRef(({ width, opacity }, ref) => {
  const dispatch = useDispatch();
  const [showChildren, setShowChildren] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const [myUser, setMyUser] = useState();
  const [activeSegment, setActiveSegment] = useState("Home");

  const isRole = useSelector((state) => state.insertIds.isRole);
  const isAdmin = useSelector((state) => state.insertIds.isAdmin);

  useEffect(() => {
    fetch("http://localhost:5000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setMyUser(data.datas);
        dispatch(setIsDataMyUser(data.datas));
      });
  }, [dispatch]);

  const toggleChildren = (segment) => {
    setShowChildren((prev) =>
      prev.includes(segment)
        ? prev.filter((item) => item !== segment)
        : [...prev, segment]
    );
  };

  function createData(
    segment,
    title,
    clickable,
    icon = undefined,
    component = undefined,
    color = undefined,
    fontSize = undefined,
    onOpen = null,
    children = undefined,
    badge = undefined
  ) {
    return {
      segment,
      title,
      clickable,
      icon,
      component,
      color,
      fontSize,
      onOpen,
      children,
      badge,
    };
  }
  const NAVIGATION = [
    createData(undefined, "garis", false),
    createData("Main", "Main", false, undefined, undefined, "red", "18px"),
    createData("Home", "Home", true, <HomeIcon />, <Home />),
    createData(
      "Profile",
      "Profile",
      true,
      <AccountCircleIcon />,
      <ProfileUser />
    ),
    ...(isRole || isAdmin
      ? [
          createData(
            "Dashboard",
            "Dashboard",
            true,
            <DashboardIcon />,
            <div>component dashboard</div>
          ),
          createData(
            "Order",
            "Order",
            true,
            <InventoryIcon />,
            <div>component Order</div>,
            undefined,
            undefined,
            null,
            undefined,
            17
          ),
          createData(
            "Payment",
            "Payment",
            true,
            <PaymentIcon />,
            <div>component payment</div>
          ),
          createData(
            "Product",
            "Product",
            true,
            <ShoppingCartIcon />,
            <TableProduct />
          ),
          createData(undefined, "garis", false),
          ...(isAdmin
            ? [
                createData(
                  "Component",
                  "Component",
                  false,
                  undefined,
                  undefined,
                  "red",
                  "18px"
                ),
                createData(
                  "Table",
                  "Table",
                  false,
                  <TableChartIcon />,
                  undefined,
                  undefined,
                  undefined,
                  () => toggleChildren("Table"),
                  [
                    createData(
                      "user",
                      "user",
                      true,
                      <PeopleIcon />,
                      <TableUser />
                    ),
                    createData(
                      "All Product",
                      "All Product",
                      true,
                      <ProductionQuantityLimitsIcon />,
                      <TableAllProduct />
                    ),
                  ]
                ),
              ]
            : []),
        ]
      : []),
  ];

  return (
    <>
      <Container
        ref={ref}
        sx={{
          width,
          opacity,
          overflow: "hidden",
          height: "100vh",
          backgroundColor: "black",
          position: "fixed",
          zIndex: 999,
        }}
      >
        <Box sx={{ pt: 1 }}>
          {myUser &&
            myUser.map((data) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  my: 1,
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    p: 0,
                    backgroundColor: "yellow",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="your-image-url"
                    alt="product"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Button>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 500,
                    textAlign: "center",
                    mb: 1,
                    color: "white",
                  }}
                >
                  {data.name}
                </Typography>
              </Box>
            ))}

          {NAVIGATION.map((item, index) =>
            item.segment ? (
              <React.Fragment key={index}>
                <Box
                  onClick={() => {
                    if (item.clickable) {
                      if (item.onOpen) {
                        item.onOpen();
                      }
                      if (activeSegment !== item.segment) {
                        setActiveSegment(item.segment);
                      }
                    } else if (item.children) {
                      toggleChildren(item.segment);
                    }
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    padding: "8px 16px",
                    cursor: item.clickable ? "pointer" : "default",
                    "&:hover": {
                      backgroundColor: item.clickable ? "gray" : "inherit",
                    },
                  }}
                >
                  {item.badge ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}


                  <Typography
                    sx={{ ml: 1, color: item.color, fontSize: item.fontSize }}
                  >
                    {item.title}
                  </Typography>

                  {item.children &&
                    (showChildren.includes(item.segment) ? (
                      <ArrowDropUpIcon sx={{ ml: "auto" }} />
                    ) : (
                      <ArrowDropDownIcon sx={{ ml: "auto" }} />
                    ))}
                </Box>

                {item.children && showChildren.includes(item.segment) && (
                  <Box sx={{ pl: 4 }}>
                    {item.children.map((child, childIndex) => (
                      <Box
                        key={childIndex}
                        onClick={() => {
                          if (child.clickable) {
                            if (activeSegment !== child.segment) {
                              setActiveSegment(child.segment);
                            }
                          }
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                          padding: "8px 16px",
                          cursor: child.clickable ? "pointer" : "default",
                          "&:hover": {
                            backgroundColor: child.clickable
                              ? "gray"
                              : "inherit",
                          },
                        }}
                      >
                        {child.icon}
                        <Typography
                          sx={{
                            ml: 1,
                            color: child.color,
                            fontSize: child.fontSize,
                          }}
                        >
                          {child.title}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </React.Fragment>
            ) : (
              <Box
                key={index}
                sx={{ height: "1px", backgroundColor: "gray", my: 1 }}
              />
            )
          )}
        </Box>

        <IconButton onClick={() => setShowLogout(true)} sx={{ width: "100%" }}>
          <Box
            sx={{
              color: "red",
              fontWeight: 600,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              mt: 2,
              minWidth: "100%",
            }}
          >
            <LogoutIcon />
            <Typography sx={{ ml: 1, fontWeight: 600 }}>LogOut</Typography>
          </Box>
        </IconButton>
      </Container>

      <Box>
        {NAVIGATION.map((segment) =>
          segment.segment === activeSegment && segment.component ? (
            <React.Fragment key={segment.segment}>
              {segment.component}
            </React.Fragment>
          ) : (
            segment.children?.map((child) =>
              child.segment === activeSegment && child.component ? (
                <React.Fragment key={child.segment}>
                  {child.component}
                </React.Fragment>
              ) : null
            )
          )
        )}
      </Box>
      <LogOut openModal={showLogout} closeModal={() => setShowLogout(false)} />
    </>
  );
});

export default Dashboard;
