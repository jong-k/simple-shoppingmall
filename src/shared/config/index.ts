export const API_BASE_URL = "https://dummyjson.com";

export const API_ENDPOINT = {
  PRODUCTS: "/products",
} as const;

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  NOT_FOUND: "*",
} as const;

export const API_GET_LIMIT = 20;
