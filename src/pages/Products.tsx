import { useEffect, useState } from "react";
import { getProducts } from "../entities/product/api";
import { ProductCard } from "../entities/product/ui";

export default function Products() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts({ limit: 20 });
        setData(result);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Hello from Products Page</h2>
      <div>{data && data.products.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  );
}
