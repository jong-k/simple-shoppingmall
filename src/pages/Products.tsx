import { useEffect, useState } from "react";
import { getProducts } from "../entities/product/api";

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
      <div>
        {data &&
          data.products.map(p => (
            <div key={p.id} className="flex gap-4">
              <div>{p.id}</div>
              <div>
                <img src={p.thumbnail} />
              </div>
              <div>{p.title}</div>
              <div>{p.price}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
