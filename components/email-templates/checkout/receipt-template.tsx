import { TCartItem } from '@/store'
import React from 'react'

interface ReceiptTemplateProps {
	orderId: number
	cartItems: TCartItem[]
}

export const ReceiptTemplate: React.FC<Readonly<ReceiptTemplateProps>> = ({
	orderId,
	cartItems,
}) => (
	<div>
		<h1>Спасибо за покупку! 🎉</h1>

		<p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

		<hr />

		<ul>
			{cartItems.map(cartItem => (
				<li key={cartItem.id}>
					{cartItem.variant.product.name} | {cartItem.variant.price} ₽ x{' '}
					{cartItem.quantity} шт. = {cartItem.variant.price * cartItem.quantity}{' '}
					₽
				</li>
			))}
		</ul>
	</div>
)
