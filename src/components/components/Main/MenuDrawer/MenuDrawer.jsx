import React, { useEffect, useState } from "react";
import { Button, Drawer, Menu, Radio, Space } from "antd";
import { items } from "../../../data";
import { Link, useLocation } from "react-router-dom";
import DynamicIcon from "../../../reusable/IconComponent/IconComponent";
const MenuDrawer = ({ drawerState = false, onClose }) => {
  // hooks
  let loc = useLocation();
  let pathName = loc?.pathname;
  console.log("loc", loc);
  const [selectedItem, setSelectedItem] = useState("1");
  const onClick = (e) => {
    setSelectedItem(e.key);
    onClose();
  };
  console.log("selectedItem", selectedItem);

  const modifiedItems = items.map((item) => ({
    key: item.key,
    label: <Link to={item.path}>{item.label}</Link>,
    icon: (
      <DynamicIcon
        iconName={item.icon}
        color={selectedItem == item.key ? "#000000" : "#ffffff"}
        size={18}
      />
    ),
  }));

  useEffect(() => {
    let item = items.find((item) => item.path.includes(pathName));
    console.log("item", item);
    if (item) setSelectedItem(item?.key);
    else setSelectedItem("");
  }, [loc]);

  return (
    <>
      <Drawer
        title="Smart-X Technologys"
        placement="left"
        closable={drawerState}
        onClose={onClose}
        open={drawerState}
        key={"left"}
        style={{ width: "60%", padding: "15px 0px", background: "#2c1944" }}
      >
        <Menu
          onClick={onClick}
          style={{
            background: "#2c1944",
            width: "100%",
          }}
          selectedKeys={[selectedItem]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={modifiedItems}
        />
      </Drawer>
    </>
  );
};
export default MenuDrawer;
