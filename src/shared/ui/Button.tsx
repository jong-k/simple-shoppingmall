import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text: string;
  onClick?: (event: React.PointerEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button className={twMerge("cursor-pointer rounded-sm bg-slate-300 px-2 py-1", className)} onClick={onClick}>
      {text}
    </button>
  );
}
