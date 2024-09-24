import React from 'react'

interface PaymentTemplateProps {
	orderId: number
	totalPrice: number
	paymentUrl: string
}

export const PaymentTemplate: React.FC<Readonly<PaymentTemplateProps>> = ({
	orderId,
	totalPrice,
	paymentUrl,
}) => (
	<div>
		<h1>Заказ #{orderId}</h1>

		<p>
			Оплатите заказ на сумму <b>{totalPrice} ₽</b>. Перейдите{' '}
			<a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
		</p>
	</div>
)
