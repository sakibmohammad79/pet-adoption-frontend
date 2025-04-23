import { USER_ROLE } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PetsIcon from "@mui/icons-material/Pets";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import StarIcon from "@mui/icons-material/Star";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

export const DrawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  const deafaultMenus = [
    
    {
      title: "Password Change",
      path: `password-change`,
      icon: KeyIcon,
    },
  ];

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
          icon: AdminPanelSettingsIcon,
        },
        {
          title: "Manage User",
          path: `${role}/users`,
          icon: SupervisorAccountIcon,
        },
        {
          title: "Manage Pet",
          path: `${role}/pets`,
          icon: PetsIcon,
        },
        {
          title: "Manage Adoption",
          path: `${role}/manage-adoptions`,
          icon: AddHomeWorkIcon,
        },
        {
          title: "Manage review",
          path: `${role}/manage-review`,
          icon: AddHomeWorkIcon,
        },
        {
          title: "My Profile",
          path: `${role}/profile`,
          icon: AccountCircleIcon,
        },
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
          title: "All Pet",
          path: `${role}/all-pet`,
          icon: AddHomeWorkIcon,
        },
        {
          title: "My Booked Pet",
          path: `${role}/my-booked`,
          icon: AddHomeWorkIcon,
        },
        {
          title: "My Adopted Pet",
          path: `${role}/my-adopt`,
          icon: AddHomeWorkIcon,
        },

        {
          title: "Give Review",
          path: `${role}/review`,
          icon: StarIcon,
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
          path: `${role}/pet-published`,
          icon: PublishedWithChangesIcon,
        },
        {
          title: "Give Review",
          path: `${role}/review`,
          icon: StarIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenus, ...deafaultMenus];
};
