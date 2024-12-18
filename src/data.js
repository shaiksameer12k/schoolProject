export const menuData = [
  { menu_id: 1, menu_name: "Dashboard", menu_path: "/layout/dashboard" },
  // { menu_id: 2, menu_name: "SSLC", menu_path: "/SSLC" },
  // { menu_id: 3, menu_name: "PUC", menu_path: "/PUC" },
  // { menu_id: 4, menu_name: "Degree", menu_path: "/Degree" },
  { menu_id: 2, menu_name: "Students List", menu_path: "/layout/studentsList" },
  { menu_id: 3, menu_name: "User Master", menu_path: "/layout/userMaster" },
];

export const items = [
  {
    key: "1",
    label: "Profile",
    path: "/layout/profile",
    icon: "FaUser",
    isVisible: false,
  },
  {
    key: "2",
    label: "Dashboard",
    path: "/layout/dashboard",
    icon: "FaHome",
    isVisible: true,
  },

  {
    key: "3",
    label: "Students List",
    path: "/layout/studentsList",
    icon: "BsShop",
    isVisible: true,
  },
  {
    key: "4",
    label: "User Master",
    path: "/layout/userMaster",
    icon: "BsShop",
    isVisible: true,
  },
];
