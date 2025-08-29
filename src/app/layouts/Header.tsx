import { Link } from "react-router";
import { AppContainer } from "../../shared/ui";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <AppContainer>
        <Link to="/">Simple Shoppingmall</Link>
      </AppContainer>
    </header>
  );
}
