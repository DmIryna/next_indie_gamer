"use client"

import { useState } from "react"
import { LinkIcon, CheckIcon } from "@heroicons/react/20/solid"

function ShareLinkButton() {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setClicked(true)
    setTimeout(() => setClicked(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      className="text-slate-500 text-sm rounded border py-1 px-2 hover:bg-orange-100 hover:text-slate-700"
    >
      {clicked ? (
        <span className="flex gap-2 items-center w-auto">
          Link Copied <CheckIcon className="w-4 h-4" />
        </span>
      ) : (
        <span className="flex gap-2 items-center w-auto">
          Share link <LinkIcon className="w-4 h-4" />
        </span>
      )}
    </button>
  )
}

export default ShareLinkButton
