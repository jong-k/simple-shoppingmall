import { Card } from "../../../shared/ui";
import type { Product } from "../model";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex items-center gap-4">
      {/* image */}
      <div className="w-24 shrink-0 md:w-28">
        <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
          <img
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
      </div>
      {/* contents */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-lg font-semibold tracking-tight md:text-xl">{product.title}</h3>
        <div className="mt-1 text-sm text-slate-700 md:text-base">$ {product.price}</div>
      </div>
    </Card>
  );
}
