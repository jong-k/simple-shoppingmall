import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={twMerge("rounded-xl bg-white p-3 shadow-sm", className)}>{children}</div>;
}
