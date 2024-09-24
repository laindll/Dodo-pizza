'use client'

import { createOrder } from '@/app/actions'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CheckoutAddress } from './checkout-address/checkout-address'
import { CheckoutCart } from './checkout-cart/checkout-cart'
import { CheckoutCustomer } from './checkout-customer/checkout-customer'
import { CheckoutInfo } from './checkout-info'
import { checkoutSchema, TCheckoutForm } from './checkout-schema'

interface Props {
	className?: string
	user?: User
}

export const CheckoutForm: React.FC<Props> = ({ className, user }) => {
	const { cartItems, totalPrice, clearCart, loading } = useCart()
	const [submitting, setSubmitting] = useState(false)

	const form = useForm<TCheckoutForm>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			email: user?.email || '',
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			phone: user?.phone || '',
			address: '',
			comment: '',
		},
	})

	const onSubmit: SubmitHandler<TCheckoutForm> = async data => {
		try {
			setSubmitting(true)
			let url = await createOrder(data, cartItems[0].cartId)
			toast.success('Заказ успешно создан', {
				position: 'bottom-center',
			})

			location.href = url
		} catch (err) {
			console.log(err)
			toast.error('Произошла ошибка при создании заказа', {
				position: 'bottom-center',
			})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className={cn('', className)}>
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex justify-between gap-11"
				>
					<div className="flex flex-col max-w-[780px] w-full gap-11">
						<CheckoutCart
							cartItems={cartItems}
							clearCart={clearCart}
							totalPrice={totalPrice}
						/>
						<CheckoutCustomer />
						<CheckoutAddress />
					</div>

					<div className="max-w-[450px] w-full">
						<CheckoutInfo
							totalPrice={totalPrice}
							loading={loading}
							submitting={submitting}
						/>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
