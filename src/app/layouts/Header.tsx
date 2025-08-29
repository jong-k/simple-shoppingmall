import { Link } from "react-router";
import { Container } from "../../shared/ui";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <Container>
        <Link to="/">Simple Shoppingmall</Link>
      </Container>
    </header>
  );
}
