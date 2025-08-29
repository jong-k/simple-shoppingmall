import { ROUTES } from "../../../shared/config";
import { axiosClient } from "../../../shared/lib/http";
import type { Product, ProductsResponse } from "../model";

type GetProductsParams = { limit?: number; skip?: number; signal?: AbortSignal };

export const getProducts = async ({ limit = 20, skip = 0, signal }: GetProductsParams) => {
  const params: Record<string, number> = {};
  if (limit !== undefined) params.limit = limit;
  if (skip !== undefined) params.skip = skip;

  const { data } = await axiosClient.get<ProductsResponse>(ROUTES.PRODUCTS, {
    params,
    signal,
  });
  return data;
};

export const getProductById = async (id: number, signal?: AbortSignal) => {
  const { data } = await axiosClient.get<Product>(`${ROUTES.PRODUCTS}/${id}`, { signal });
  return data;
};
