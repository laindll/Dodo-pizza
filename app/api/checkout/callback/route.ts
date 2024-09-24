import { PaymentCallbackData } from '@/@types/yookassa'
import { ReceiptTemplate } from '@/components/email-templates'
import { sendEmail } from '@/lib/send-email'
import { prisma } from '@/prisma/prisma-client'
import { TCartItem } from '@/store'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const data = (await req.json()) as PaymentCallbackData

		let order = await prisma.order.findFirst({
			where: {
				id: Number(data.object.metadata.order_id),
			},
			include: {
				user: true,
				cart: {
					include: {
						cartItems: {
							include: {
								variant: {
									include: {
										product: true,
									},
								},
							},
						},
					},
				},
			},
		})

		if (!order) {
			return NextResponse.json({ error: 'Order not found' })
		}

		const isSucceeded = data.object.status === 'succeeded'

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCEDED : OrderStatus.CANCELLED,
			},
		})

		const cartItems = order.cart.cartItems as TCartItem[]

		if (isSucceeded) {
			await sendEmail(
				order.email || '',
				'Dodo Pizza | Ваш заказ успешно оформлен 🎉',
				ReceiptTemplate({
					cartItems,
					orderId: order.id,
				})
			)
		}

		return NextResponse.json(data)
	} catch (error) {
		console.log('[CHECKOUT_CALLBACK] Server error', error)
		return NextResponse.json({ error: 'Server error' })
	}
}
