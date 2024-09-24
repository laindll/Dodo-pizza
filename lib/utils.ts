import { prisma } from '@/prisma/prisma-client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface searchParams {
	query?: string
	sortBy?: string
	ingredients?: string
	priceFrom?: string
	priceTo?: string
}

const DEFAULT_PRICE_FROM = 0
const DEFAULT_PRICE_TO = 3000

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getCategories = async (params: searchParams) => {
	const ingredientIds = params.ingredients?.split(',').map(Number)
	const priceFrom = Number(params.priceFrom) || DEFAULT_PRICE_FROM
	const priceTo = Number(params.priceTo) || DEFAULT_PRICE_TO

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'asc',
				},
				where: {
					OR: [
						{
							ingredients: {
								some: {
									id: {
										in: ingredientIds,
									},
								},
							},
						},
						{
							ingredients: {
								every: {
									id: {
										in: [],
									},
								},
							},
						},
					],
					variants: {
						some: {
							price: {
								gte: priceFrom,
								lte: priceTo,
							},
						},
					},
				},
				include: {
					variants: true,
					ingredients: true,
				},
			},
		},
	})

	return categories
}
