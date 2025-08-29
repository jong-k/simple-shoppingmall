import { Outlet } from "react-router";
import Header from "./Header";
import { Container } from "../../shared/ui";

export default function AppLayout() {
  return (
    <div className="bg-background w-full">
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
