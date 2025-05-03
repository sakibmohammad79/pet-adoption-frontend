import { getUserInfo, removeUser } from "@/services/auth.services";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButtonLg = () => {
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
    <Box>
      {userInfo?.userId ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
  <IconButton
    onClick={handleOpenUserMenu}
    sx={{
      p: 0,
      borderRadius: "50%",
      border: "2px solid #ffffff55",
      transition: "0.3s",
      "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        borderColor: "#ffffffaa",
      },
    }}
  >
    <Avatar
      alt="User Avatar"
      src="https://i.ibb.co/p6wb1JBc/man.png"
      sx={{
        width: 40,
        height: 40,
      }}
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
                  handleCloseUserMenu(); 
                  if (setting === "Profile") {
                    router.push(`/dashboard/${userRole}/profile`);
                  }
                  if (setting === "Dashboard") {
                    router.push(`/dashboard/${userRole}`);
                  }
                  if (setting === "Logout") {
                    handleLogout(); 
                  }
                }}
              >
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <Link href="/login">
          <Button sx={{ display: {} }}>Login</Button>
        </Link>
      )}
    </Box>
  );
};

export default AuthButtonLg;
