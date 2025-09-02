import { twMerge } from "tailwind-merge";
import { ProductThumbnail } from "./ProductThumbnail";
import { TEST_ID } from "../../../shared/config";
import { Badge, Card } from "../../../shared/ui";
import type { Product } from "../model";

interface ProductDetailsProps extends Omit<Product, "id"> {
  className?: string;
}

export function ProductDetails({ title, price, tags, thumbnail, className }: ProductDetailsProps) {
  return (
    <Card className={twMerge("flex min-w-[250px] flex-wrap items-center gap-4", className)}>
      <ProductThumbnail src={thumbnail} alt={title} className="w-48" />

      <div className="flex-1">
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} title={tag} />
          ))}
        </div>
        <h3 data-testid={TEST_ID.PRODUCT_TITLE} className="text-xl font-semibold md:text-2xl">
          {title}
        </h3>
        <div className="mt-4 text-base text-slate-700 md:text-lg">
          $ <span data-testid={TEST_ID.PRODUCT_PRICE}>{price}</span>
        </div>
      </div>
    </Card>
  );
}
