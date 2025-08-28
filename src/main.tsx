import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import ProductDetail from "./pages/ProductDetail.tsx";
import Products from "./pages/Products.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
