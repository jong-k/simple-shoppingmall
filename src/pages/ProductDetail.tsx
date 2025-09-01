import { useParams } from "react-router";
import NotFound from "./NotFound";
import { ProductDetailsSection } from "../widgets/product-detail/ui";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);

  if (id == undefined || !/^\d+$/.test(id)) {
    return <NotFound />;
  }

  return <ProductDetailsSection productId={productId} />;
}
