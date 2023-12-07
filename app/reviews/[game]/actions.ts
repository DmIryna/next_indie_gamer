"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createComment } from "@/lib/comments"

interface CreateCommentActionProps {
  errors: {
    user?: string[]
    message?: string[]
    _form?: string
  }
  success?: boolean
}
const createCommentSchema = z.object({
  slug: z.string(),
  user: z.string().min(3),
  message: z.string().min(5).max(500),
})

export const createCommentAction = async (
  formState: CreateCommentActionProps,
  formData: FormData
): Promise<CreateCommentActionProps> => {
  const data = {
    slug: formData.get("slug") as string,
    user: formData.get("user") as string,
    message: formData.get("message") as string,
  }

  const result = createCommentSchema.safeParse(data)

  if (result.success === false)
    return {
      errors: result.error.flatten().fieldErrors,
    }

  try {
    await createComment(data)
  } catch (error: unknown) {
    if (error instanceof Error) return { errors: { _form: error.message } }

    return { errors: { _form: "Something went wrong" } }
  }

  revalidatePath(`/reviews/${data.slug}`)

  return { errors: {}, success: true }
}
