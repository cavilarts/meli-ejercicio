import { Navigation } from "./Navigation";

function Header() {
  return (
    <header className="bg-turbo">
      <Navigation />
    </header>
  );
}

Header.displayName = Object.keys(Header).join("");

export { Header };
