import Image from "next/image"
import Link from "next/link"
import Heading from "../../components/Heading"
import { getAllReviews } from "@/lib/reviews"
import PaginationBar from "@/components/PaginationBar"
import SearchBox from "@/components/SearchBox"

interface ReviewsPageProps {
  searchParams: { page?: string }
}

export const metadata = {
  title: "Reviews",
}

const PAGE_SIZE = 6

const Reviews = async ({ searchParams }: ReviewsPageProps) => {
  const page = parsePage(searchParams.page)
  const { reviews, pageCount } = await getAllReviews(PAGE_SIZE, page)

  return (
    <>
      <Heading title="Reviews" />
      <div className="flex justify-between pb-3">
        <PaginationBar page={page} pageCount={pageCount} href="reviews" />
        <SearchBox />
      </div>
      <ul className="flex flex-row flex-wrap gap-6 ">
        {reviews.map((review, index) => (
          <li
            className="bg-white border rounder w-80 shadow hover:shadow-2xl"
            key={review.title}
          >
            <Link href={`/reviews/${review.game}`}>
              <Image
                src={review.image}
                alt={review.title}
                width={320}
                height={180}
                className="object-contain rounded-t mb-2"
                priority={index === 0}
              />
              <h2 className="font-orbitron font-semibold text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

const parsePage = (pageValue: string): number => {
  if (pageValue) {
    const page = parseInt(pageValue)
    if (isFinite(page) && page > 1) return page
  }

  return 1
}

export default Reviews
