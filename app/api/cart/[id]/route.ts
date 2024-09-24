import { updateTotalPrice } from '@/lib/updateTotalPrice'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = Number(params.id)
		const data = (await req.json()) as { quantity: number }

		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}

		await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: data.quantity,
			},
		})

		const cart = await updateTotalPrice(token)

		return NextResponse.json(cart)
	} catch (error) {
		console.log('[CART_PATCH] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось обновить корзину' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = Number(params.id)

		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}

		await prisma.cartItem.delete({
			where: {
				id,
			},
		})

		const cart = await updateTotalPrice(token)

		return NextResponse.json(cart)
	} catch (error) {
		console.log('[CART_PATCH] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось обновить корзину' },
			{ status: 500 }
		)
	}
}
