import { useEffect, useState } from "react";
import { getProducts } from "../entities/product/api";
import { ProductsList } from "../widgets/products-list/ui";

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

  return <div>{data && <ProductsList products={data.products} />}</div>;
}
