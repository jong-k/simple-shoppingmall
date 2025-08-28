import { useParams } from "react-router";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  if (id == undefined || !/^\d+$/.test(id)) {
    return <NotFound />;
  }

  const productId = parseInt(id);

  return <div>Hello from products detail page! #{productId}</div>;
}
