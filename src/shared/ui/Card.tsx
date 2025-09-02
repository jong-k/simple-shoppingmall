import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = ComponentProps<"div">;

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div {...rest} className={twMerge("rounded-xl bg-white p-3 shadow-sm", className)}>
      {children}
    </div>
  );
}
