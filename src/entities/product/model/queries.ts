import { infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../../product/api";

export const productsQueryKeys = {
  list: (params: { limit?: number; skip?: number } = {}) => ["products", "list", params] as const,
  detail: (id: number) => ["products", "detail", id] as const,
};

export const infiniteProductQueryOptions = (params: { limit?: number } = {}) =>
  infiniteQueryOptions({
    queryKey: productsQueryKeys.list(params),
    queryFn: ({ pageParam = 0, signal }) => getProducts({ limit: params.limit, skip: pageParam, signal }),
    getNextPageParam: lastPage => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
  });

export const useInfiniteProductsQuery = (params: { limit?: number } = {}) =>
  useInfiniteQuery(infiniteProductQueryOptions(params));

export const productByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: productsQueryKeys.detail(id),
    queryFn: ({ signal }) => getProductById(id, signal),
    enabled: Number.isFinite(id),
  });

export const useProductByIdQuery = (id: number) => useQuery(productByIdQueryOptions(id));
