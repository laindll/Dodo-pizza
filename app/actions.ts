'use server'

import { PaymentTemplate } from '@/components/email-templates/checkout/payment-template'
import { VerificationTemplate } from '@/components/email-templates/verification/verification-template'
import { TCheckoutForm } from '@/components/shared/checkout/checkout-schema'
import { createPayment } from '@/lib/create-payment'
import { getUserSession } from '@/lib/getUserSession'
import { sendEmail } from '@/lib/send-email'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'

export async function createOrder(data: TCheckoutForm, cartId: number) {
	try {
		const order = await prisma.order.create({
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
				email: data.email,
				address: data.address,
				comment: data.comment,
				cartId: cartId,
				status: OrderStatus.PENDING,
			},
			include: {
				cart: true,
			},
		})

		const token = crypto.randomUUID()

		await prisma.cart.create({
			data: {
				token,
			},
		})

		const cookieStore = cookies()
		cookieStore.set('cartToken', token)

		const paymentData = await createPayment({
			orderId: order.id,
			totalPrice: order.cart.totalPrice,
			description: 'Оплата заказа #' + order.id,
		})

		console.log(paymentData)

		if (!paymentData) throw new Error('Payment data not found')

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		})

		const paymentUrl = paymentData.confirmation.confirmation_url

		await sendEmail(
			data.email,
			'Next Pizza / Оплатите заказ #' + order.id,
			PaymentTemplate({
				orderId: order.id,
				totalPrice: order.cart.totalPrice,
				paymentUrl,
			})
		)

		return paymentUrl
	} catch (err) {
		console.error(err)

		return ''
	}
}

export async function updateUserInfo(data: Prisma.UserUpdateInput) {
	try {
		const session = await getUserSession()

		if (!session) throw new Error('Session not found')

		const user = await prisma.user.findFirst({
			where: {
				id: Number(session.id),
			},
		})

		await prisma.user.update({
			where: {
				id: Number(session.id),
			},
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				password: data.password
					? hashSync(data.password as string, 10)
					: user?.password,
			},
		})
	} catch (err) {
		console.error('[UPDATE_USER_INFO_ERROR]', err)
		throw err
	}
}

export async function registerUser(data: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: data.email,
			},
		})

		if (user) {
			if (!user.verified) throw new Error('User is not verified')
			throw new Error('User already exists')
		}

		const createdUser = await prisma.user.create({
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				password: hashSync(data.password, 10),
				verified: false,
			},
		})

		const code = Math.floor(100000 + Math.random() * 900000).toString()

		await prisma.verificationCode.create({
			data: {
				userId: createdUser.id,
				value: code,
			},
		})

		await sendEmail(
			data.email,
			'Next Pizza | Подтвердите ваш email',
			VerificationTemplate({ code })
		)
	} catch (err) {
		console.log('[REGISTER_USER_ERROR]', err)
		throw err
	}
}
