import { twMerge } from "tailwind-merge";
import type { Product } from "../../../entities/product/model";
import { ProductCard } from "../../../entities/product/ui";

interface ProductsListProps {
  products: Product[];
  className?: string;
}

export function ProductsList({ products, className }: ProductsListProps) {
  return (
    <section className={twMerge("py-4", className)}>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {products.map(p => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
