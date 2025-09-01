import { twMerge } from "tailwind-merge";
import { ProductsList } from "./ProductsList";
import { useProductsQuery } from "../../../entities/product/model";

interface InfiniteProductsListProps {
  limit: number;
  className?: string;
}

export function InfiniteProductsList({ limit, className }: InfiniteProductsListProps) {
  const { data, isLoading, isError } = useProductsQuery({ limit });

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Failed to load products.</div>;

  return <div className={twMerge(className)}>{data && <ProductsList products={data?.products} />}</div>;
}
