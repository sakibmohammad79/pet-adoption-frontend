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
          title: "Manage admin",
          path: `${role}/admins`,
          icon: ManageAccountsIcon,
        },
        {
          title: "Manage User",
          path: `${role}/users`,
          icon: ManageAccountsIcon,
        },
        {
          title: "Manage Pet",
          path: `${role}/pets`,
          icon: ManageAccountsIcon,
        },
        {
          title: "Manage Adoption",
          path: `${role}/adoptions`,
          icon: ManageAccountsIcon,
        },
        {
          title: "My Profile",
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
          title: "My Book Request",
          path: `${role}/pet-book`,
          icon: AddHomeWorkIcon,
        },
        {
          title: "My Adopted Pet",
          path: `${role}/pet-adopt`,
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
        },
        {
          title: "Give Review",
          path: `${role}/review`,
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
          title: "Create New Pet",
          path: `${role}/pet-create`,
          icon: PublishedWithChangesIcon,
        },
        {
          title: "My Published Pet",
          path: `${role}/my-published`,
          icon: PublishedWithChangesIcon,
        },
        {
          title: "My Requested Pet",
          path: `${role}/pet-published`,
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
        },
        {
          title: "Give Review",
          path: `${role}/review`,
          icon: ManageAccountsIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenus];
};
