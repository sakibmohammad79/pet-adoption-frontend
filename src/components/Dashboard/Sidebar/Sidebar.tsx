import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Divider, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Sidebar = () => {
  const drawer = (
    <div>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box>
      <Stack
        component={Link}
        href="/"
        sx={{ py: 1 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <Image
          height={50}
          width={50}
          src="https://i.postimg.cc/8cJ5XMDB/adopt-a-pet-cute-puppies-in-the-box-illustration-in-flat-style-free-vector.jpg"
          alt="Pet-icon"
        ></Image>
        <Typography variant="h6" component="h1">
          Pet Adoption
        </Typography>
      </Stack>
      {drawer}
    </Box>
  );
};

export default Sidebar;
