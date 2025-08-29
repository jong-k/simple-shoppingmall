import { Outlet } from "react-router";
import Header from "./Header";
import { Container } from "../../shared/ui";

export default function AppLayout() {
  return (
    <div className="min-h-dvh w-full bg-background">
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
