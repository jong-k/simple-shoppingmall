import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import { ProductsList } from "./ProductsList";
import { useProductsQuery } from "../../../entities/product/model";

interface InfiniteProductsListProps {
  limit: number;
  className?: string;
}

export function InfiniteProductsList({ limit, className }: InfiniteProductsListProps) {
  const { data, isLoading, isError } = useProductsQuery({ limit });
  const { ref, inView } = useInView({ threshold: 0, rootMargin: "200px 0px" });

  useEffect(() => {
    if (inView) console.log(inView);
  }, [inView]);

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Failed to load products.</div>;

  return (
    <section className={twMerge("py-4", className)}>
      {data && <ProductsList products={data?.products} />}
      <div ref={ref} className=""></div>
    </section>
  );
}
