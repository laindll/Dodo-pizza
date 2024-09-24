import { updateTotalPrice } from '@/lib/updateTotalPrice'
import { prisma } from '@/prisma/prisma-client'
import { TItem } from '@/store'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			const cart = await prisma.cart.findFirst({
				where: {
					userId: 1,
				},
			})

			return NextResponse.json(cart)
		}

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

		return NextResponse.json(cart)
	} catch (error) {
		console.log('[CART_GET] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		const data = (await req.json()) as TItem

		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			token = crypto.randomUUID()
		}

		let cart = await prisma.cart.findFirst({
			where: {
				token,
			},
		})

		if (!cart) {
			cart = await prisma.cart.create({
				data: {
					token,
				},
			})
		}

		const cartItems = await prisma.cartItem.findMany({
			where: {
				variantId: data.variantId,
				cartId: cart.id,
				ingredients: {
					every: {
						id: {
							in: data.ingredients.map(ingredient => ingredient.id),
						},
					},
				},
			},
			include: {
				ingredients: true,
			},
		})

		let cartItemIndex

		for (let i = 0; i < cartItems.length; i++) {
			if (cartItems[i].ingredients.length === data.ingredients.length)
				cartItemIndex = i
		}

		if (cartItemIndex !== undefined) {
			await prisma.cartItem.update({
				where: {
					id: cartItems[cartItemIndex].id,
				},
				data: {
					quantity: cartItems[cartItemIndex].quantity + 1,
				},
			})
		} else {
			await prisma.cartItem.create({
				data: {
					variant: {
						connect: {
							id: data.variantId,
						},
					},
					cart: {
						connect: {
							id: cart?.id,
						},
					},
					ingredients: {
						connect: data.ingredients.map(ingredient => ({
							id: ingredient.id,
						})),
					},
					quantity: data.quantity,
				},
			})
		}

		cart = await updateTotalPrice(token)

		const resp = NextResponse.json(cart)

		resp.cookies.set('cartToken', token)

		return resp
	} catch (error) {
		console.log('[CART_POST] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину или добавить в нее товар' },
			{ status: 500 }
		)
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ cartItems: [] })
		}

		const cart = await prisma.cart.findFirst({
			where: {
				token,
			},
			include: {
				cartItems: true,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: cart?.id,
			},
		})

		const newCart = await updateTotalPrice(token)

		return NextResponse.json(newCart)
	} catch (error) {
		console.log('[CART_DELETE] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось очистить корзину' },
			{ status: 500 }
		)
	}
}
