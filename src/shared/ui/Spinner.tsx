import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500"></div>
      </div>
    </div>
  );
}
