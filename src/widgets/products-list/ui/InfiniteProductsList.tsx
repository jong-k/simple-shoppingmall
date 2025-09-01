import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import { ProductsList } from "./ProductsList";
import { useInfiniteProductsQuery } from "../../../entities/product/model";
import { API_GET_LIMIT } from "../../../shared/config";
import { Spinner } from "../../../shared/ui";

interface InfiniteProductsListProps {
  className?: string;
}

export function InfiniteProductsList({ className }: InfiniteProductsListProps) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProductsQuery({
    limit: API_GET_LIMIT,
  });
  const { ref, inView } = useInView({ threshold: 0, rootMargin: "200px 0px" });

  const products = data?.pages.flatMap(p => p.products) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) fetchNextPage();
  }, [inView, hasNextPage, isLoading, fetchNextPage]);

  if (isLoading)
    return (
      <div className={twMerge("flex min-h-dvh items-center justify-center", className)}>
        <Spinner />
      </div>
    );

  if (isError) return <div>Failed to load products.</div>;

  return (
    <section className={twMerge("py-4", className)}>
      <ProductsList products={products} />
      <div ref={ref} className="pt-8 pb-4 text-center">
        {isFetchingNextPage && <Spinner />}
        {!hasNextPage && <span>더 이상 상품이 존재하지 않습니다</span>}
      </div>
    </section>
  );
}
