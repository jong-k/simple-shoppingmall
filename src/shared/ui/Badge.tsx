import { twMerge } from "tailwind-merge";

interface BadgeProps {
  title: string;
  className?: string;
}

export function Badge({ title, className }: BadgeProps) {
  return (
    <div className={twMerge("w-fit rounded-lg bg-slate-400 px-2 py-0.5 text-sm font-light text-white", className)}>
      {title}
    </div>
  );
}
