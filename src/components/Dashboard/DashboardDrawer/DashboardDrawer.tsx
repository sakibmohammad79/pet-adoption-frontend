"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "../Sidebar/Sidebar";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { Avatar, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings"; // Add this at the top


const drawerWidth = 240;

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [userName, setUserName] = React.useState("User");
  const [userRole, setUserRole] = React.useState("");
  const { data, isLoading } = useGetMyProfileQuery({});
  const profileData = data?.profile;
  React.useEffect(() => {
    if (profileData) {
      if (profileData?.role === "ADMIN") {
        setUserName(
          `${profileData?.admin?.firstName} ${profileData?.admin?.lastName}` ||
            "Admin"
        );
      } else if (profileData?.role === "PET_ADOPTER") {
        setUserName(
          `${profileData?.adopter?.firstName} ${profileData?.adopter?.lastName}` ||
            "Adopter"
        );
      } else {
        setUserName(
          `${profileData?.publisher?.firstName} ${profileData?.publisher?.lastName}` ||
            "Publisher"
        );
      }
    }
  }, [profileData]);

  React.useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUserRole(userInfo?.role);
    }
  }, [userRole]);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  //setting
  const handleLogout = () => {
    removeUser();
    router.refresh();
  };

  const settings = ["HOME", "PROFILE", "LOGOUT"];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            {/* Left Side - User Name */}
            <Box>
              <Typography variant="h6" noWrap component="div">
                Hey, {userName}
              </Typography>
            </Box>

            {/* Right Side - Avatar and Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
              <IconButton
  onClick={handleOpenUserMenu}
  sx={{
    p: 1,
    backgroundColor: "#ffffff20",
    borderRadius: "50%",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#ffffff40",
      transform: "rotate(20deg) scale(1.1)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },
  }}
>
  <SettingsIcon sx={{ color: "white" }} />
</IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === "HOME") {
                        router.push(`/`);
                      }
                      if (setting === "PROFILE") {
                        router.push(`/dashboard/${userRole}/profile`);
                      }
                      if (setting === "LOGOUT") {
                        handleLogout();
                        router.push("/");
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
