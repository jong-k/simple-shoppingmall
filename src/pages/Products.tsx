import { useProductsQuery } from "../entities/product/model";
import { ProductsList } from "../widgets/products-list/ui";

export default function Products() {
  const { data, isLoading, isError } = useProductsQuery({ limit: 20 });

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Failed to load products.</div>;

  return <div>{data && <ProductsList products={data.products} />}</div>;
}
