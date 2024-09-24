import { ProductInfo, ProductList } from '@/components/shared'
import { Container, Title } from '@/components/ui'
import { prisma } from '@/prisma/prisma-client'
import { CartItem } from '@prisma/client'
import { notFound } from 'next/navigation'

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string }
}) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			variants: true,
			ingredients: true,
		},
	})

	const sizes = await prisma.size.findMany()
	const doughs = await prisma.dough.findMany()
	const ingredients = await prisma.ingredient.findMany()

	const otherProducts = await prisma.product.findMany({
		where: {
			id: {
				not: Number(id),
			},
			categoryId: product?.categoryId,
		},
		include: {
			variants: true,
			ingredients: true,
		},
	})

	if (!product) {
		return notFound()
	}

	const addToCart = (cartItem: CartItem) => {
		prisma.cart.update({
			where: { id: 1 },
			data: {
				cartItems: {
					set: [cartItem],
				},
			},
		})
	}

	return (
		<Container className="flex flex-col items-center my-10 max-w-[1060px]">
			<ProductInfo
				product={product}
				sizes={sizes}
				doughs={doughs}
				ingredients={ingredients}
				isDialogue={false}
				className="mb-20"
			/>

			<Title size="md" className="font-bold w-full text-left">
				Смотрите также
			</Title>
			<ProductList
				categoryId={product.categoryId}
				products={otherProducts}
				sizes={sizes}
				doughs={doughs}
				ingredients={ingredients}
			/>
		</Container>
	)
}
