import { memo } from "react";
import { twMerge } from "tailwind-merge";
import type { Product } from "../../../entities/product/model";
import { ProductCard } from "../../../entities/product/ui";

interface ProductsListProps {
  products: Product[];
  className?: string;
}

export const ProductsList = memo(function ProductsListComponent({ products, className }: ProductsListProps) {
  return (
    <ul className={twMerge("grid grid-cols-1 gap-4 md:grid-cols-2", className)}>
      {products.map(p => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
});
