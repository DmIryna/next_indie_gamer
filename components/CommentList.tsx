import { UserCircleIcon } from "@heroicons/react/24/outline"
import { getComments } from "@/lib/comments"

async function CommentList({ slug }: { slug: string }) {
  const comments = await getComments(slug)

  if (comments.length === 0)
    return <p className="italic my-3">No comments yet</p>

  return (
    <ul className="border mt-3 rounded">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
        >
          <div className="flex gap-3 pb-1 text-slate-500">
            <UserCircleIcon className="w-6 h-6" />
            <p>{comment.user}</p>
          </div>
          <p className="italic">{comment.message}</p>
        </li>
      ))}
    </ul>
  )
}

export default CommentList
