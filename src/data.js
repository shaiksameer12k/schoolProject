export const menuData = [
  {
    menu_id: 1,
    menu_name: "Dashboard",
    menu_path: "/layout/dashboard",
    route: "dashboard",
  },
  // { menu_id: 2, menu_name: "SSLC", menu_path: "/SSLC" },
  // { menu_id: 3, menu_name: "PUC", menu_path: "/PUC" },
  // { menu_id: 4, menu_name: "Degree", menu_path: "/Degree" },
  {
    menu_id: 2,
    menu_name: "Students List",
    menu_path: "/layout/studentsList",
    route: "studentsList",
  },
  {
    menu_id: 3,
    menu_name: "User Master",
    menu_path: "/layout/userMaster",
    route: "userMaster",
  },
  {
    menu_id: 4,
    menu_name: "Questions Uploads",
    menu_path: "/layout/uploads",
    route: "uploads",
  },
];

export const items = [
  {
    key: "1",
    label: "Profile",
    path: "/layout/profile",
    icon: "FaUser",
    isVisible: false,
    route: "profile",
  },
  {
    key: "2",
    label: "Dashboard",
    path: "/layout/dashboard",
    icon: "FaHome",
    isVisible: true,
    route: "dashboard",
  },

  {
    key: "3",
    label: "Students List",
    path: "/layout/studentsList",
    icon: "BsShop",
    isVisible: true,
    route: "studentsList",
  },
  {
    key: "4",
    label: "User Master",
    path: "/layout/userMaster",
    icon: "BsShop",
    isVisible: true,
    route: "userMaster",
  },
  {
    key: "5",
    label: "Questions Uploads",
    path: "/layout/uploads",
    icon: "FaUpload",
    isVisible: true,
    route: "uploads",
  },
];
