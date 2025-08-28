import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "./NotFound";

const URL = "https://dummyjson.com/products";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const url = `${URL}/${id || 1}`;
    const fetchProduct = async () => {
      console.log("Fetching!");
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        const error = err as Error;
        setData(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (id == undefined || !/^\d+$/.test(id)) {
    return <NotFound />;
  }

  const productId = parseInt(id);

  return (
    <div>
      <h2>Hello from products detail page! #{productId}</h2>
      {data && (
        <div className="flex gap-4">
          <div>{data.id}</div>
          <div>
            <img src={data.thumbnail} />
          </div>
          <div>{data.title}</div>
          <div>{data.price}</div>
          <div>{data.tags}</div>
        </div>
      )}
    </div>
  );
}
