"use client"

import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { createCommentAction } from "@/app/reviews/[game]/actions"
import FormButton from "./FormButton"

function CommentForm({ title, slug }: { title: string; slug: string }) {
  const [formState, action] = useFormState(createCommentAction, { errors: {} })
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (formState.success) formRef.current?.reset()
  }, [formState])

  return (
    <form
      ref={formRef}
      action={action}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded"
    >
      <p className="pb-2 ">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div className="flex flex-col gap-2">
        <label htmlFor="user" className="shrink-0 w-32">
          Your name
        </label>
        <input
          type="text"
          id="user"
          className="border px-2 py-1 rounded w-48"
          name="user"
        />
        {formState?.errors?.user && (
          <p className="bg-red-100 text-red-600 rounded-lg p-2 text-xs">
            {formState.errors.user.join(", ")}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea
          id="message"
          className="border px-2 py-1 rounded w-full"
          name="message"
        />
        {formState?.errors?.message && (
          <p className="bg-red-100 text-red-600 rounded-lg p-2 text-xs">
            {formState.errors.message.join(", ")}
          </p>
        )}
      </div>
      <FormButton>Submit</FormButton>
    </form>
  )
}

export default CommentForm
