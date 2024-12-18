import React from "react";

import Main from "./components/Main/Main";

import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginPage/LoginComponent";
import Layout from "./components/Layout/Layout";
import StudentRegisterForm from "./components/Main/pages/StudentRegisterForm";
import Dashboard from "./components/Main/DashboardComponents/Dashboard";
import Studentslist from "./components/Main/pages/Studentslist";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/loginPage" element={<LoginComponent />} />
      <Route path="/layout" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="studentsList" element={<Studentslist />} />
        <Route path="userMaster" element={<StudentRegisterForm />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default Router;
