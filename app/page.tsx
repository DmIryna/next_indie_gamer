import Image from "next/image"
import Link from "next/link"
import Heading from "../components/Heading"
import { getAllReviews } from "@/lib/reviews"

const Home = async () => {
  const { reviews } = await getAllReviews(3)

  return (
    <>
      <Heading title="Indie Gamer" />
      <p className="pb-3">Only the best indie games, reviewed for you</p>
      <ul className="flex flex-col gap-4">
        {reviews.map((review, index) => (
          <li
            className="bg-white border rounder w-80 sm:w-full shadow hover:shadow-2xl"
            key={review.game}
          >
            <Link
              href={`./reviews/${review.game}`}
              className="flex flex-col sm:flex-row"
            >
              <Image
                src={review.image}
                alt={review.title}
                width={320}
                height={180}
                className="object-contain rounded-t sm:rounded-l sm:rounded-r-none"
                priority={index === 0}
              />
              <div className="px-2 py-1 text-center sm:text-left">
                <h2 className="font-orbitron font-semibold ">{review.title}</h2>
                <p className="hidden sm:block pt-2">{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
