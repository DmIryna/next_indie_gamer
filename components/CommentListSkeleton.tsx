import { UserCircleIcon } from "@heroicons/react/24/outline"

function CommentListSkeleton() {
  return (
    <ul className="border mt-3 rounded animate-pulse">
      {[1, 2, 3].map((index) => (
        <li
          key={index}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
        >
          <div className="flex gap-3 items-center pb-1 text-slate-300">
            <UserCircleIcon className="w-6 h-6" />
            <div className="bg-gray-300 rounded h-5 w-24" />
          </div>
          <div className="py-1">
            <div className="bg-gray-300 rounded h-5 w-2/3" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CommentListSkeleton
