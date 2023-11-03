import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

interface PaginationProps {
  page: number
  pageCount: number
  href: string
}

const PaginationBar = ({ page, pageCount, href }: PaginationProps) => {
  return (
    <div className="flex gap-3 items-center">
      {page > 1 ? (
        <Link
          href={`/${href}?page=${page - 1}`}
          className="border rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="sr-only">Previous Page</span>
        </Link>
      ) : (
        <span className="border rounded text-slate-300 text-sm cursor-not-allowed">
          <ChevronLeftIcon className="w-5 h-5" />
        </span>
      )}
      <span>
        Page {page} of {pageCount}
      </span>
      {page < pageCount ? (
        <Link
          href={`/${href}?page=${page + 1}`}
          className="border rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
        >
          <ChevronRightIcon className="w-5 h-5" />
          <span className="sr-only">Next Page</span>
        </Link>
      ) : (
        <span className="border rounded text-slate-300 text-sm cursor-not-allowed">
          <ChevronRightIcon className="w-5 h-5" />
        </span>
      )}
    </div>
  )
}

export default PaginationBar
