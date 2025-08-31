import { useParams } from "react-router";
import NotFound from "./NotFound";
import { useProductByIdQuery } from "../entities/product/model";
import { ProductDetails } from "../entities/product/ui";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const { data, isLoading, isError } = useProductByIdQuery(productId);

  if (id == undefined || !/^\d+$/.test(id)) {
    return <NotFound />;
  }

  if (isLoading) return <div>Loading product...</div>;
  if (isError) return <div>Failed to load product.</div>;

  return (
    <section className="py-4">
      {data && <ProductDetails price={data.price} title={data.title} thumbnail={data.thumbnail} tags={data.tags} />}
    </section>
  );
}
