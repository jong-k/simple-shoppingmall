import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "./NotFound";
import { getProductById } from "../entities/product/api";
import { ProductDetails } from "../entities/product/ui";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id == undefined || !/^\d+$/.test(id)) return;
    const productId = parseInt(id);
    const fetchProductById = async () => {
      try {
        const result = await getProductById(productId);
        setData(result);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProductById();
  }, [id]);

  if (id == undefined || !/^\d+$/.test(id)) {
    return <NotFound />;
  }

  const productId = parseInt(id);

  return (
    <div>
      <h2>Hello from products detail page! #{productId}</h2>
      {data && <ProductDetails price={data.price} title={data.title} thumbnail={data.thumbnail} tags={data.tags} />}
      {/* {data && (
        <div className="flex gap-4">
          <div>{data.id}</div>
          <div>
            <img src={data.thumbnail} />
          </div>
          <div>{data.title}</div>
          <div>{data.price}</div>
          <div>{data.tags}</div>
        </div>
      )} */}
    </div>
  );
}
