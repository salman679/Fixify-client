import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider.jsx";
import { router } from "./routes/Router.jsx";
import SearchProvider from "./providers/SearchProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <SearchProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SearchProvider>
    </HelmetProvider>
  </StrictMode>
);
