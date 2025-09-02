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

  if (isLoading || isError)
    return (
      <div className={twMerge("flex min-h-screen items-center justify-center", className)}>
        {isLoading ? <Spinner /> : "일시적인 에러가 발생했습니다"}
      </div>
    );

  return (
    <section className={twMerge("py-4", className)}>
      {data && <ProductDetails price={data.price} title={data.title} thumbnail={data.thumbnail} tags={data.tags} />}
    </section>
  );
}
