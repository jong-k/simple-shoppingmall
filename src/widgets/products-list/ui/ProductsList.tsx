import { twMerge } from "tailwind-merge";
import { useProductsQuery } from "../../../entities/product/model";
import { ProductCard } from "../../../entities/product/ui";

interface ProductsListProps {
  className?: string;
}

export function ProductsList({ className }: ProductsListProps) {
  const { data, isLoading, isError } = useProductsQuery({ limit: 20 });

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Failed to load products.</div>;

  return (
    <section className={twMerge("py-4", className)}>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data &&
          data.products.map(p => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
      </ul>
    </section>
  );
}
