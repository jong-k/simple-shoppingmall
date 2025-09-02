import { infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import type { Product, ProductsResponse } from "./types";
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

export const productByIdQueryOptions = (id: number, opts?: { initialData?: () => Product | undefined }) =>
  queryOptions({
    queryKey: productsQueryKeys.detail(id),
    queryFn: ({ signal }) => getProductById(id, signal),
    enabled: Number.isFinite(id),
    initialData: opts?.initialData,
  });

export const useProductByIdQuery = (id: number) => {
  const queryClient = useQueryClient();

  const getInitialFromList = () => {
    const entries = queryClient.getQueriesData<InfiniteData<ProductsResponse>>({
      queryKey: productsQueryKeys.list(),
    });
    for (const [, data] of entries) {
      const found = data?.pages.flatMap(p => p.products).find(p => p.id === id);
      if (found) return found;
    }
    return undefined;
  };

  return useQuery(productByIdQueryOptions(id, { initialData: getInitialFromList }));
};
