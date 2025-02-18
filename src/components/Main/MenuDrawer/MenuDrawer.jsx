import React, { useEffect, useState } from "react";
import { Button, Divider, Drawer, Menu, Radio, Space } from "antd";
import { items } from "../../../data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DynamicIcon from "../../../reusable/IconComponent/IconComponent";
const MenuDrawer = ({ drawerState = false, onClose, menuList }) => {
  // hooks
  let loc = useLocation();
  let navigate = useNavigate();
  let pathName = loc?.pathname;
  console.log("loc", loc);
  const [selectedItem, setSelectedItem] = useState("1");
  const [modifiedItems, setModifiedItems] = useState([]);

  const onClick = (e) => {
    setSelectedItem(e.key);
    onClose();
  };
  console.log("selectedItem", selectedItem);

  useEffect(() => {
    let item = menuList.find((item) => item?.Menu_Path?.includes(pathName));
    console.log("item", item);
    if (item) setSelectedItem(item?.key);
    else setSelectedItem("");
  }, [loc]);

  useEffect(() => {
    const modifiedMenuData = menuList.map((item) => ({
      key: item.Menu_id,
      label: <Link to={item.Menu_Path}>{item.Menu_name}</Link>,
      icon: (
        <DynamicIcon
          iconName={item.icon}
          color={selectedItem == item.key ? "#000000" : "#ffffff"}
          size={18}
        />
      ),
    }));
    setModifiedItems(modifiedMenuData);
  }, [menuList]);


  console.log("modifiedItems",modifiedItems , menuList)

  return (
    <>
      <Drawer
        title="SunRise"
        placement="left"
        closable={drawerState}
        onClose={onClose}
        open={drawerState}
        key={"left"}
        style={{
          width: "20%",
          padding: "15px 0px 0px 0px",
          background: "#2c1944",
        }}
        footer={
          <div
            style={{ display: "flex", gap: 2, paddingLeft: "24px" }}
            className="ant-menu-item py-3"
            onClick={() => navigate("/")}
          >
            <DynamicIcon color="#ffffff" iconName="FaPowerOff" size={18} />
            <span className="ant-menu-title-content">Log Out</span>
          </div>
        }
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
