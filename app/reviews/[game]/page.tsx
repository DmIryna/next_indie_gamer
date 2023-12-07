import { Suspense } from "react"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"
import Heading from "../../../components/Heading"
import ShareLinkButton from "@/components/ShareLinkButton"
import CommentList from "@/components/CommentList"
import CommentForm from "@/components/CommentForm"
import CommentListSkeleton from "@/components/CommentListSkeleton"
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

      <div className="flex gap-3 items-baseline mb-4 ">
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

      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
        <h2 className="font-bold text-xl flex gap-2 items-center">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comments
        </h2>
        <CommentForm title={review.title} slug={game} />

        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList slug={game} />
        </Suspense>
      </section>
    </>
  )
}

export default ReviewPage
