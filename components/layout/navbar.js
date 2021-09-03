import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <div>
        <Link href="/">Freedemy</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/categories">All Categories</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
