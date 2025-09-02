import { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import { Container } from "../../shared/ui";
import { Spinner } from "../../shared/ui";

export default function AppLayout() {
  return (
    <div className="min-h-dvh w-full bg-background">
      <Header />
      <Container>
        <Suspense
          fallback={
            <div className="flex min-h-dvh items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </Container>
    </div>
  );
}
