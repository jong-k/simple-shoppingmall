import { ProductThumbnail } from "./ProductThumbnail";
import { Badge, Card } from "../../../shared/ui";
import type { Product } from "../model";

type ProductDetailsProps = Omit<Product, "id">;

export function ProductDetails({ title, price, tags, thumbnail }: ProductDetailsProps) {
  return (
    <Card className="flex min-w-[250px] flex-wrap items-center gap-4">
      <ProductThumbnail src={thumbnail} alt={title} className="w-48" />

      <div className="flex-1">
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} title={tag} />
          ))}
        </div>
        <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
        <div className="mt-4 text-base text-slate-700 md:text-lg">$ {price}</div>
      </div>
    </Card>
  );
}
