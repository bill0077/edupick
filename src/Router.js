import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import CourseListPage from "./pages/CourseListPage.js";
import CoursePriceComparisonPage from "./pages/CoursePriceComparisonPage.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/course-comparison" element={<CoursePriceComparisonPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;