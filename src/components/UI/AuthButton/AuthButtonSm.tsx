import { getUserInfo, removeUser } from "@/services/auth.services";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
const AuthButtonSm = () => {
  const [userRole, setUserRole] = React.useState("");
  React.useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUserRole(userInfo?.role);
    }
  }, [userRole]);
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    removeUser();
    router.refresh();
  };

  const settings = ["Profile", "Dashboard", "Logout"];
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
    <Stack justifyContent="center">
      {userInfo?.userId ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src="https://i.ibb.co.com/p6wb1JBc/man.png"
              />
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
            open={Boolean(anchorElUser)} // ✅ Ensure 'open' is always defined
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  handleCloseUserMenu(); // Close menu first
                  if (setting === "Logout") {
                    handleLogout(); // Call logout only when clicking "Logout"
                  }
                  if (setting === "Dashboard") {
                    router.push(`/dashboard/${userRole}`);
                  }
                }}
              >
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <Button
          component={Link}
          href="/login"
          sx={{ width: "50%", mx: "auto" }}
        >
          Login
        </Button>
      )}
    </Stack>
  );
};

export default AuthButtonSm;
