import { Badge, Image, Menu, Space } from "antd";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import MenuDrawer from "../Main/MenuDrawer/MenuDrawer";
import { items, menuData } from "../../data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DynamicIcon from "../../reusable/IconComponent/IconComponent";
import UserMenu from "../../reusable/CustomMenu/CustomMenu";
import { CurrentRoute } from "../../utils/constant";

const Header = ({ scrollY, isAdimn }) => {
  // hooks
  let navegate = useNavigate();
  let loc = useLocation();
  let pathName = loc?.pathname;

  let Menulists = JSON.parse(localStorage.getItem("Menulists"));

  console.log("Menulists",Menulists)

  const [openDrawer, setOpenDrawer] = useState(true);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  console.log("scrollY", scrollY);
  console.log("CurrentRoute()", CurrentRoute());

  return (
    <header
      id="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 3,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: scrollY > 50 ? "#F5F3F6" : "#ffffff",
        boxShadow: scrollY > 50 ? "0px 3px 10px rgba(0,0,0,0.3)" : "none",
        transition: "all easy-in-out .5s",
        justifyContent: "space-between",
        padding: "0px 20px",
        height: "50px",
      }}
    >
      <Image src={logo} id="header_logo" />

      <nav className="flex items-center gap-4  h-full">
        {isAdimn && (
          <>
            {" "}
            <ul className="flex gap-4 items-center" id="lg_menu">
              {items
                .filter((item) => item.isVisible)
                .map((item) => (
                  <li>
                    <Link
                      to={item?.path}
                      className={
                        (item.path.includes(CurrentRoute()) &&
                          pathName !== "/" &&
                          CurrentRoute() != "layout") ||
                        (CurrentRoute() == "layout" &&
                          item.path.includes("dashboard"))
                          ? "menu-item active-menu-item"
                          : "menu-item"
                      }
                    >
                      {console.log("item", item.path.includes(item?.route))}
                      {item?.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <div
              id="lg_menu"
              style={{ border: "1px solid lightgray", height: "100%" }}
            ></div>{" "}
          </>
        )}

        <ul className="flex gap-4 items-center" id="lg_menu">
          <li>
            <div>
              <UserMenu isAdimn={isAdimn} />
            </div>
          </li>
        </ul>

        {/* <div id="sm_menu" className="flex items-center"> */}
        <DynamicIcon
          iconName="MdMenuOpen"
          size={30}
          onClickHandel={showDrawer}
        />
        {/* </div> */}

        <MenuDrawer
          drawerState={openDrawer}
          onClose={onClose}
          menuList={Menulists}
          isAdimn={isAdimn}
        />
      </nav>
    </header>
  );
};

export default Header;
