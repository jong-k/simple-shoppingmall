import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../../product/api";

export const productsQueryKeys = {
  list: (params: { limit?: number; skip?: number } = {}) => ["products", "list", params] as const,
  detail: (id: number) => ["products", "detail", id] as const,
};

export const productsQueryOptions = (params: { limit?: number; skip?: number } = {}) =>
  queryOptions({
    queryKey: productsQueryKeys.list(params),
    queryFn: ({ signal }) => getProducts({ ...params, signal }),
  });

export const useProductsQuery = (params: { limit?: number; skip?: number } = {}) =>
  useQuery(productsQueryOptions(params));

export const productByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: productsQueryKeys.detail(id),
    queryFn: ({ signal }) => getProductById(id, signal),
    enabled: Number.isFinite(id),
  });

export const useProductByIdQuery = (id: number) => useQuery(productByIdQueryOptions(id));
