import { ProductThumbnail } from "./ProductThumbnail";
import { Card } from "../../../shared/ui";
import type { Product } from "../model";

type ProductDetailsProps = Omit<Product, "id">;

export function ProductDetails({ title, price, tags, thumbnail }: ProductDetailsProps) {
  return (
    <Card className="flex items-center gap-4">
      <ProductThumbnail src={thumbnail} alt={title} className="w-30 md:w-36" />

      <div className="min-w-0 flex-1">
        <div>{tags}</div>
        <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
        <div className="mt-1 text-sm text-slate-700 md:text-base">$ {price}</div>
      </div>
    </Card>
  );
}
