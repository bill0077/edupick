import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import CourseListPage from "./pages/CourseListPage.js";
import CoursePriceComparisonPage from "./pages/CoursePriceComparisonPage.js";
import NotReady from "./pages/NotReady.js";
import NotFound from "./pages/NotFound.js";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/course-comparison" element={<CoursePriceComparisonPage />} />
        <Route path="/not-ready" element={<NotReady />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;