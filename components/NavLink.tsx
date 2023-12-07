"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkProps {
  title: string
  href: string
  style?: string
}

function NavLink({ title, href, style }: NavLinkProps) {
  const pathName = usePathname()

  if (pathName === href) {
    return <span className={`text-orange-600 ${style}`}>{title}</span>
  }

  return (
    <Link
      className={`text-orange-600 cursor-pointer hover:underline hover:text-gray-500 ml-auto ${style}`}
      href={href}
    >
      {title}
    </Link>
  )
}

export default NavLink
