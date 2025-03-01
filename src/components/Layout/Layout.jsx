import React, { useEffect, useRef, useState } from "react";

import Header01 from "../Header/Header";
import Footer from "../Footer/Footer";

import { FloatButton, Button, Layout, Menu, theme, Drawer, Grid } from "antd";
import DynamicIcon from "../../reusable/IconComponent/IconComponent.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MenuDrawer from "../Main/MenuDrawer/MenuDrawer.jsx";
import { menuData } from "../../data.js";
const { Header, Sider, Content } = Layout;
const Layout01 = ({ isAdimn }) => {
  const [scrollY, setScrollY] = useState(null);
  let Menulists = JSON.parse(localStorage.getItem("Menulists"));
  let location = useLocation();
  let navigate = useNavigate();
  let { xs } = Grid.useBreakpoint();

  useEffect(() => {
    const handleScroll = () => {
      let scrollY = window.scrollY;
      setScrollY(scrollY);
      console.log("scrollY:", scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log("scrollY:", scrollY);

  let containerRef = useRef();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  useEffect(() => {
    if (!axios.defaults.headers.common["Authorization"]) {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [axios.defaults.headers.common["Authorization"]]);

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Track if the screen is mobile
  const [drawerVisible, setDrawerVisible] = useState(false); // Control drawer visibility
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    // <div className="w-full" ref={containerRef}>
    <Layout className="h-lvh">
      {/* Sidebar for Desktop */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg" // Collapse sidebar on screens smaller than 992px
        collapsedWidth={isMobile ? "0" : "80"} // Adjust collapsed width for mobile
        onBreakpoint={(broken) => {
          setIsMobile(broken); // Update isMobile state based on breakpoint
          if (broken) {
            setCollapsed(true); // Automatically collapse sidebar on small screens
          } else {
            setCollapsed(false); // Expand sidebar on larger screens
          }
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 2,
          display: isMobile ? "none" : "block", // Hide sidebar on mobile
          background: "#2c1944",
        }}
      >
        <div className="demo-logo-vertical" />
        <div className="h-[90%]">
          <MenuDrawer menuList={Menulists} />
        </div>

        <div
          style={{ display: "flex", gap: 2, paddingLeft: "24px" }}
          className="ant-menu-item py-3"
          onClick={() =>
            navigate(isAdimn ? "/AdminLoginPage" : "/StudentLoginPage")
          }
        >
          <DynamicIcon color="#ffffff" iconName="FaPowerOff" size={18} />
          <span className="ant-menu-title-content">Log Out</span>
        </div>
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 80 : 200, // Adjust margin for mobile
          transition: "margin 0.2s", // Smooth transition for sidebar toggle
        }}
      >
        <Header className="p-0">
          <Header01
            scrollY={scrollY}
            isAdimn={isAdimn}
            setCollapsed={setCollapsed}
          />
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer />
      </Layout>

      {isMobile && (
        <Drawer
          title="SunRise"
          placement="left"
          closable={collapsed}
          onClose={() => setCollapsed(false)}
          open={collapsed}
          key={"left"}
          style={{
            width: xs ? "60%" : "0%",
            padding: "15px 0px 0px 0px",
            background: "#2c1944",
          }}
          footer={
            <div
              style={{ display: "flex", gap: 2, paddingLeft: "24px" }}
              className="ant-menu-item py-3"
              onClick={() =>
                navigate(isAdimn ? "/AdminLoginPage" : "/StudentLoginPage")
              }
            >
              <DynamicIcon color="#ffffff" iconName="FaPowerOff" size={18} />
              <span className="ant-menu-title-content">Log Out</span>
            </div>
          }
        >
          <MenuDrawer menuList={Menulists} />
        </Drawer>
      )}
      <FloatButton
        icon={<DynamicIcon iconName="FaArrowUp" color="#ffffff" size={20} />}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "red",
          transform: scrollY > 200 ? "translateX(0%)" : "translateX(200%)",
          transition: "all .5s",
          zIndex: 1,
        }}
        onClick={scrollToTop}
      />
    </Layout>
  );
};
export default Layout01;
