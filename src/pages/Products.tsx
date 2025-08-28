import axios from "axios";
import { useEffect, useState } from "react";

const URL = "https://dummyjson.com/products";

export default function Products() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Fetching!");
      try {
        const res = await axios.get(URL, {
          params: {
            limit: 20,
          },
        });
        setData(res.data);
      } catch (err) {
        const error = err as Error;
        setData(error.message);
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
