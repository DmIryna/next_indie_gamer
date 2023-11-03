import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import Heading from "../../../components/Heading"
import ShareLinkButton from "@/components/ShareLinkButton"
import { getGames, getReview } from "@/lib/reviews"

interface ReviewPageParams {
  game: string
}

interface ReviewPageProps {
  params: ReviewPageParams
}

export const generateMetadata = async ({
  params: { game },
}: ReviewPageProps): Promise<Metadata> => {
  const review = await getReview(game)

  if (!review) notFound()

  return {
    title: review.title,
  }
}

export const generateStaticParams = async (): Promise<ReviewPageParams[]> => {
  const games = await getGames()

  return games.map((game) => ({ game }))
}

const ReviewPage = async ({ params: { game } }: ReviewPageProps) => {
  const review = await getReview(game)

  if (!review) notFound()

  return (
    <>
      <Heading title={review.title} />
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline mb-4">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={review.image}
        alt="Stardew Valley"
        width={640}
        height={360}
        className="object-contain"
        priority
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="prose prose-slate max-w-screen-sm"
      />
    </>
  )
}

export default ReviewPage
