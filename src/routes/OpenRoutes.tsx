import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { Home, Login, SignUp } from "../pages";

export const OpenRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};
