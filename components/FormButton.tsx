"use client"

import { ReactNode } from "react"
import { useFormStatus } from "react-dom"

interface FormButtonProps {
  children: ReactNode
}

function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-orange-700 rounded px-2 py-1 self-center text-orange-100 w-32 hover:bg-orange-600 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}

export default FormButton
