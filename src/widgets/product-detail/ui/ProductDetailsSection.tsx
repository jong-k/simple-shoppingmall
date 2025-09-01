import { twMerge } from "tailwind-merge";
import { useProductByIdQuery } from "../../../entities/product/model";
import { ProductDetails } from "../../../entities/product/ui";
import { Spinner } from "../../../shared/ui";

interface ProductDetailsSectionProps {
  productId: number;
  className?: string;
}

export function ProductDetailsSection({ productId, className }: ProductDetailsSectionProps) {
  const { data, isLoading, isError } = useProductByIdQuery(productId);

  if (isLoading)
    return (
      <div className={twMerge("flex min-h-screen items-center justify-center", className)}>
        <Spinner />
      </div>
    );

  if (isError) return <div>Failed to load product.</div>;

  return (
    <section className={twMerge("py-4", className)}>
      {data && <ProductDetails price={data.price} title={data.title} thumbnail={data.thumbnail} tags={data.tags} />}
    </section>
  );
}
