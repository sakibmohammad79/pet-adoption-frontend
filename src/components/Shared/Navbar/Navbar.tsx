"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getUserInfo } from "@/services/auth.services";

const drawerWidth = 240;

export default function Navbar() {
  const userInfo = getUserInfo();
  const [userRole, setUserRole] = React.useState("");
  React.useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUserRole(userInfo?.role);
    }
  }, [userRole]);
  const AuthButtonLg = dynamic(
    () => import("@/components/UI/AuthButton/AuthButtonLg"),
    { ssr: false }
  );

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PET
      </Typography>
      <Divider />

      <Box sx={{ display: { md: "block", lg: "none", direction: "row" } }}>
        <Link href="/">
          <Typography fontWeight={600} my={2}>
            HOME
          </Typography>
        </Link>
        <Link href="/pet-list">
          <Typography fontWeight={600}>PET LIST</Typography>
        </Link>
        <Link href="/">
          <Typography fontWeight={600} my={2}>
            ABOUT
          </Typography>
        </Link>
        <Link href="/">
          <Typography fontWeight={600}>CONTACT</Typography>
        </Link>
        {userInfo?.userId && (
          <Link href={`/dashboard/${userRole}`}>
            <Typography mt={2} fontWeight={600}>
              DASHBOARD
            </Typography>
          </Link>
        )}
      </Box>
    </Box>
  );

  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#F4F1EA", py: 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%", gap: 5 }}
          >
            <Link href="/">
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                PET ADOPT
              </Typography>
            </Link>
            <Box sx={{ display: { xs: "none", sm: "flex", gap: 32 } }}>
              <Link href="/">
                <Typography fontWeight={600}>HOME</Typography>
              </Link>
              <Link href="/pet-list">
                <Typography fontWeight={600}>PET LIST</Typography>
              </Link>
              
              <Link href="/about">
                <Typography fontWeight={600}>ABOUT</Typography>
              </Link>
              <Link href="/contact">
                <Typography fontWeight={600}>CONTACT</Typography>
              </Link>
              {userInfo?.userId && (
                <Link href={`/dashboard/${userRole}`}>
                  <Typography fontWeight={600}>DASHBOARD</Typography>
                </Link>
              )}
            </Box>

            <AuthButtonLg></AuthButtonLg>
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
