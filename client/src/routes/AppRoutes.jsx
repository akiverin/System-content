import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/";
import Profile from "../pages/Profile/";
import Auth from "../pages/Auth";
import Logout from "../pages/Logout";
import PrivateRoute from "@components/PrivateRoute";
import Courses from "../pages/Courses";
import Course from "../pages/Course";
import Post from "../pages/Post";
import Groups from "../pages/Groups";
import VideoList from "../pages/VideoList";
import VideoPage from "../pages/VideoPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/videos" element={<VideoList />} />
      <Route element={<PrivateRoute />}>
        <Route path="/videos/:id" element={<VideoPage />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/courses/:idCourse/:id" element={<Post />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups" element={<Groups />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
