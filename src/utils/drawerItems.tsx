import { USER_ROLE } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

export const DrawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: ManageAccountsIcon,
        },
        {
          title: "Profile",
          path: `${role}/profile`,
          icon: ManageAccountsIcon,
        },
        {
          title: "Password Change",
          path: `${role}/password-change`,
          icon: ManageAccountsIcon,
        }
      );
      break;
    case USER_ROLE.PET_ADOPTER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "My Adopt",
          path: `${role}/my-adopt`,
          icon: AddHomeWorkIcon,
        },
        {
          title: "Profile",
          path: `${role}/profile`,
          icon: ManageAccountsIcon,
        },
        {
          title: "Password Change",
          path: `${role}/password-change`,
          icon: ManageAccountsIcon,
        }
      );
      break;
    case USER_ROLE.PET_PUBLISHER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "My Published",
          path: `${role}/my-published`,
          icon: PublishedWithChangesIcon,
        },
        {
          title: "Profile",
          path: `${role}/profile`,
          icon: ManageAccountsIcon,
        },
        {
          title: "Password Change",
          path: `${role}/password-change`,
          icon: ManageAccountsIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenus];
};
