import { prisma } from '@/prisma/prisma-client'

export const updateTotalPrice = async (token: string) => {
	const cart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			cartItems: {
				orderBy: {
					createdAt: 'asc',
				},
				include: {
					variant: {
						include: {
							product: true,
							size: true,
							dough: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})

	const totalPrice = await cart?.cartItems?.reduce((acc, item) => {
		const price =
			(item?.variant?.price || 0) +
			(item?.ingredients?.reduce(
				(acc, ingredient) => acc + ingredient.price,
				0
			) || 0)

		return acc + price * item.quantity
	}, 0)

	return await prisma.cart.update({
		where: {
			id: cart?.id,
		},
		data: {
			totalPrice,
		},
		include: {
			cartItems: {
				orderBy: {
					createdAt: 'asc',
				},
				include: {
					variant: {
						include: {
							product: true,
							size: true,
							dough: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})
}
