"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDebounce } from "use-debounce"
import { Combobox } from "@headlessui/react"
import { useIsClient } from "@/lib/hooks"

function SearchBox() {
  const router = useRouter()
  const [reviews, setReviews] = useState([])
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController()
      ;(async () => {
        const url = `api/search?query=${encodeURIComponent(debouncedQuery)}`
        const response = await fetch(url, { signal: controller.signal })
        const reviews = await response.json()
        setReviews(reviews)
      })()

      return () => controller.abort()
    } else {
      setReviews([])
    }
  }, [debouncedQuery])

  const handleChange = (review) => {
    router.push(`reviews/${review.game}`)
  }

  if (!useIsClient) return <input type="text" placeholder="Search" />

  return (
    <div className="relative w-40 sm:w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search..."
          className="border rounded py-1 px-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {reviews.map((review) => {
            return (
              <Combobox.Option key={review.game} value={review}>
                {({ active }) => (
                  <span
                    className={`block  w-full px-2 truncate ${
                      active ? "bg-orange-100" : ""
                    }`}
                  >
                    {review.title}
                  </span>
                )}
              </Combobox.Option>
            )
          })}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}

export default SearchBox
