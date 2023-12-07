import { ReactNode } from "react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

interface PaginationProps {
  page: number
  pageCount: number
  href: string
}

function PaginationBar({ page, pageCount, href }: PaginationProps) {
  let enabled: boolean

  return (
    <div className="flex gap-3 items-center">
      <PaginationLink href={`/${href}?page=${page - 1}`} enabled={page > 1}>
        <ChevronLeftIcon className="w-5 h-5" />
        <span className="sr-only">Previous Page</span>
      </PaginationLink>

      <span>
        Page {page} of {pageCount}
      </span>
      <PaginationLink
        href={`/${href}?page=${page + 1}`}
        enabled={page < pageCount}
      >
        <ChevronRightIcon className="w-5 h-5" />
        <span className="sr-only">Next Page</span>
      </PaginationLink>
    </div>
  )
}

function PaginationLink({
  href,
  children,
  enabled,
}: {
  href: string
  children: ReactNode
  enabled: boolean
}) {
  if (!enabled) {
    return (
      <span className="border rounded text-slate-300 text-sm cursor-not-allowed">
        {children}
      </span>
    )
  } else {
    return (
      <Link
        href={href}
        className="border rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
      >
        {children}
      </Link>
    )
  }
}

export default PaginationBar
