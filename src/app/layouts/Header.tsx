import { Link } from "react-router";
import { ROUTES } from "../../shared/config";
import { Container } from "../../shared/ui";

export default function Header() {
  return (
    <header className="w-full bg-white py-4 text-xl font-semibold shadow-sm">
      <Container>
        <Link to={ROUTES.PRODUCTS}>Simple Shoppingmall</Link>
      </Container>
    </header>
  );
}
