import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type BadgeProps = ComponentProps<"div"> & {
  title: string;
  className?: string;
};

export function Badge({ title, className, ...rest }: BadgeProps) {
  return (
    <div
      {...rest}
      className={twMerge("w-fit rounded-lg bg-slate-400 px-2 py-0.5 text-sm font-light text-white", className)}
    >
      {title}
    </div>
  );
}
