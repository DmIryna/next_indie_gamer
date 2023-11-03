import Link from "next/link"
import NavLink from "./NavLink"

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link
            className="text-orange-600 cursor-pointer hover:underline hover:text-gray-500 "
            href="/"
          ></Link>
          <NavLink
            title="Indie Gamer"
            href="/"
            style="font-orbitron font-bold "
          />
        </li>
        <li className="ml-auto">
          <NavLink title="Reviews" href="/reviews" />
        </li>
        <li>
          <NavLink title="About" href="/about" />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
