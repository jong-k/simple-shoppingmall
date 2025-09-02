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

export const TEST_ID = {
  PRODUCT_CARD: "product-card",
  PRODUCT_DETAIL: "product-detail",
  PRODUCT_TITLE: "product-title",
  PRODUCT_PRICE: "product-price",
  PRODUCT_TAG: "product-tag",
};
