import { useParams } from "react-router";

export default function ProductDetail() {
  const { id } = useParams();

  return <div>Hello from products detail page! #{id}</div>;
}
