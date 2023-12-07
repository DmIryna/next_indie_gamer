import { db } from "./db"

interface CommentsProps {
  slug: string
  user: string
  message: string
}

export const createComment = async ({ slug, user, message }: CommentsProps) => {
  return await db.comment.create({
    data: { slug, user, message },
  })
}

export const getComments = async (slug: string) => {
  return await db.comment.findMany({
    where: { slug },
    orderBy: { postedAt: "desc" },
  })
}
