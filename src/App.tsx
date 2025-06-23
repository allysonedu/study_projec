import React from "react";

import { HashRouter } from "react-router-dom";
import { OpenRoutes } from "./routes/OpenRoutes";

export const App: React.FC = () => (
  <HashRouter>
    <OpenRoutes />
  </HashRouter>
);
