import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DynamicIcon from "../../../reusable/IconComponent/IconComponent";

const MenuDrawer = ({ menuList }) => {
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname; // Current route path

  // State
  const [selectedItem, setSelectedItem] = useState("1");

  // Update selected item based on the current route
  // useEffect(() => {
  //   const activeItem = menuList?.find((item) =>
  //     item.Menu_Path?.includes(pathName)
  //   );
  //   console.log("activeItem",activeItem)
  //   if (activeItem) {
  //     setSelectedItem(String(activeItem.Menu_id)); // Set the active item key
  //   } else {
  //     setSelectedItem("1"); // Reset if no matching route is found
  //   }
  // }, [, menuList])

  // Map menuList to Ant Design Menu items
  const modifiedItems = menuList?.map((item) => ({
    key: item.Menu_id, // Unique key for each menu item
    label: item.Menu_name,
    icon: <DynamicIcon iconName={item?.Menu_Icon} size={18} />,
  }));

  // Handle menu item clicks
  const onClick = (e) => {
    setSelectedItem(String(e.key)); // Update selected item on click
    const clickedItem = menuList?.find((item) => item.Menu_id == e.key);
    if (clickedItem) {
      navigate(clickedItem.Menu_Path); // Navigate to the selected route
    }
  };

  console.log("menuList", menuList);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[selectedItem]} // Highlight the active item
      defaultOpenKeys={["1"]}
      mode="inline"
      items={modifiedItems}
      className="bg-transparent"
    />
  );
};

export default MenuDrawer;
