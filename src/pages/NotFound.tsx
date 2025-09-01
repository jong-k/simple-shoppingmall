import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../shared/ui";

interface NotFoundProps {
  className?: string;
}

export default function NotFound({ className }: NotFoundProps) {
  return (
    <div className={twMerge("flex min-h-dvh -translate-y-1/4 items-center justify-center", className)}>
      <Card className="flex flex-col items-center gap-6 p-24">
        <h2 className="text-center text-2xl">페이지를 찾을 수 없습니다</h2>
        <Link to="/">
          <Button text="홈으로" />
        </Link>
      </Card>
    </div>
  );
}
