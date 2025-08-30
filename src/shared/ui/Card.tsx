import { twMerge } from "tailwind-merge";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={twMerge("rounded-xl bg-white p-3 shadow-sm", className)}>{children}</div>;
}
