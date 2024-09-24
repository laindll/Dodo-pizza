import { FormInput, FormTextarea } from '@/components/ui'
import { WhiteBlock } from '@/components/ui/container/white-block'

import React from 'react'

interface Props {
	className?: string
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="3. Aдрес доставки" className={className}>
			<div className="flex flex-col gap-4">
				<FormInput
					name="address"
					label="Адрес доставки"
					placeholder="ул. Пушкина, д. Колотушкина"
				/>
				<FormTextarea
					name="comment"
					label="Комментарий к заказу"
					placeholder="Домофон не работает, позвоните, пожалуйста, я спущусь"
				/>
			</div>
		</WhiteBlock>
	)
}
