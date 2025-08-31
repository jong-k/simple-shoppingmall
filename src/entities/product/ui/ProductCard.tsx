import { Link } from "react-router";
import { ProductThumbnail } from "./ProductThumbnail";
import { Card } from "../../../shared/ui";
import type { Product } from "../model";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="flex min-w-[150px] items-center gap-4 transition-shadow hover:shadow-md">
        <ProductThumbnail src={product.thumbnail} alt={product.title} className="w-24 md:w-28" />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-3 text-lg font-semibold tracking-tight md:text-xl">{product.title}</h3>
          <div className="mt-1 line-clamp-1 text-sm text-slate-700 md:text-base">$ {product.price}</div>
        </div>
      </Card>
    </Link>
  );
}
