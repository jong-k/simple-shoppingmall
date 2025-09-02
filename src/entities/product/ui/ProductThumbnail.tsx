import { twMerge } from "tailwind-merge";

interface ProductThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  "data-testid"?: string;
}

export function ProductThumbnail({ src, alt, className, "data-testid": testId }: ProductThumbnailProps) {
  return (
    <div className={twMerge("w-24 shrink-0", className)}>
      <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
        <img
          data-testid={testId}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
}
