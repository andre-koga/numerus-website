import Link from "next/link";

export default function Header() {
  return (
    <header className="m-4">
      <nav>
        <ul className="flex">
          <li className="transition-all hover:scale-90 active:scale-75">
            <Link
              href="/"
              className="rounded bg-primary px-1 text-xl font-bold uppercase italic text-dark"
            >
              nu
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
