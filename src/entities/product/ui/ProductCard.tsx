import { Link } from "react-router";
import { ProductThumbnail } from "./ProductThumbnail";
import { ROUTES } from "../../../shared/config";
import { Card } from "../../../shared/ui";
import type { Product } from "../model";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link data-testid="product-card" to={`${ROUTES.PRODUCTS}/${product.id}`}>
      <Card className="flex min-w-[150px] items-center gap-4 transition-shadow hover:shadow-md">
        <ProductThumbnail src={product.thumbnail} alt={product.title} className="w-24 md:w-28" />

        <div className="min-w-0 flex-1">
          <h3 data-testid="product-title" className="line-clamp-3 text-lg font-semibold tracking-tight md:text-xl">
            {product.title}
          </h3>
          <div className="mt-1 line-clamp-1 text-sm text-slate-700 md:text-base">
            $ <span data-testid="product-price">{product.price}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
