import "server-only"

import { marked } from "marked"
import qs from "qs"

const CMS_URL = process.env.CMS_URL
export const CACHE_TAG_REVIEWS = "reviews"

export interface Review {
  game: string
  title: string
  image: string
  date: string
  body?: string
  subtitle?: string
}

export interface CmsItem {
  id: number
  attributes: any
}

export interface PaginatedReviews {
  pageCount: number
  reviews: Review[]
}

export type SearchableReview = Pick<Review, "game" | "title">

export const getReview = async (slug: string): Promise<Review | null> => {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  })

  if (data.length === 0) return null

  const item = data[0]
  const itemToReturn = {
    ...toReview(item),
    body: marked(item.attributes.body),
  }

  return itemToReturn
}

export const getAllReviews = async (
  pageSize: number,
  page?: number
): Promise<PaginatedReviews> => {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  })

  return {
    pageCount: meta.pagination.pageCount,
    reviews: data.map(toReview),
  }
}

export const searchReview = async (
  query: string
): Promise<SearchableReview> => {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  })

  return data.map(({ attributes }) => ({
    title: attributes.title,
    game: attributes.slug,
  }))
}

export const getGames = async (): Promise<string[]> => {
  const { data } = await fetchReviews({
    fields: ["slug"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  })

  return data.map((game) => game.attributes.slug)
}

const fetchReviews = async (parameters: any) => {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true })
  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REVIEWS],
    },
  })

  if (!response.ok)
    throw new Error(`CMS returned ${response.status} for  ${url}`)

  return await response.json()
}

const toReview = (item: CmsItem): Review => {
  const { attributes } = item

  return {
    game: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-MM-dd".length),
    image: new URL(attributes.image.data.attributes.url, CMS_URL).href,
  }
}
