import React, { useEffect } from "react";

import Main from "./components/Main/Main";

import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginPage/LoginComponent";
import Layout01 from "./components/Layout/Layout";
import StudentRegisterForm from "./components/Main/pages/StudentRegisterForm";
import Dashboard from "./components/Main/DashboardComponents/Dashboard";
import Studentslist from "./components/Main/pages/Studentslist";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import UserStartAssessment from "./components/Main/pages/UserStartAssessment";
import IndudalStudentData from "./components/Main/pages/IndudalStudentData";
import UserSubjectList from "./components/Main/pages/UserSubjectList";
import UserLoginComponent from "./components/LoginPage/UserLoginComponent";
import Uploads from "./components/Main/pages/Uploads";
import Reports from "./components/Main/pages/Reports";

const Router = () => {
  let isAdimn = true;

  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/AdminLoginPage" element={<LoginComponent />} />
      <Route path="/StudentLoginPage" element={<UserLoginComponent />} />

      <Route path="/Layout" element={<Layout01 isAdimn={true} />}>
        <Route index element={<Dashboard />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="studentsList" element={<Studentslist />} />
        <Route
          path="studentsList/:studentId"
          element={<IndudalStudentData />}
        />
        <Route path="userMaster" element={<StudentRegisterForm />} />
        <Route path="uploads" element={<Uploads />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="/StudentLayout" element={<Layout01 isAdimn={false} />}>
        <Route index element={<UserSubjectList />} />
        <Route path="studentDashboard" element={<UserSubjectList />} />
        <Route
          path="studentDashboard/:subjectId"
          element={<UserStartAssessment />}
        />
        <Route
          path="studentDashboard/:subjectId/:studentId"
          element={<IndudalStudentData />}
        />
      </Route>

      <Route path="*" element={<PageNotFound isAdimn={isAdimn} />} />
    </Routes>
  );
};
export default Router;
