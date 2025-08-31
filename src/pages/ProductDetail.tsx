import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { twMerge } from "tailwind-merge";
import NotFound from "./NotFound";
import { getProductById } from "../entities/product/api";
import { ProductDetails } from "../entities/product/ui";

interface ProductDetailProps {
  className?: string;
}

export default function ProductDetail({ className }: ProductDetailProps) {
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

  return (
    <section className={twMerge("py-4", className)}>
      {data && <ProductDetails price={data.price} title={data.title} thumbnail={data.thumbnail} tags={data.tags} />}
    </section>
  );
}
