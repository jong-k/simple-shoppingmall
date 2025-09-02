import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ROUTES } from "../../shared/config";
import AppLayout from "../layouts/AppLayout";

const Products = lazy(() => import("../../pages/Products"));
const ProductDetail = lazy(() => import("../../pages/ProductDetail"));
const NotFound = lazy(() => import("../../pages/NotFound"));

export default function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={ROUTES.PRODUCTS} replace />} />
          <Route path={ROUTES.PRODUCTS.slice(1)} element={<Products />} />
          <Route path={ROUTES.PRODUCT_DETAIL.slice(1)} element={<ProductDetail />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
