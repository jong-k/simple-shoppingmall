import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import NotFound from "../../pages/NotFound";
import ProductDetail from "../../pages/ProductDetail";
import Products from "../../pages/Products";
import { ROUTES } from "../../shared/config";
import AppLayout from "../layouts/AppLayout";

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={ROUTES.PRODUCTS} replace />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
