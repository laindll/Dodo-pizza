import { FormInput } from '@/components/ui'
import { WhiteBlock } from '@/components/ui/container/white-block'
import React from 'react'

interface Props {
	className?: string
}

export const CheckoutCustomer: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональная информация" className={className}>
			<div className="grid grid-cols-2 gap-x-10 gap-y-4 w-full">
				<FormInput name="firstName" label="Имя" placeholder="Вася" />
				<FormInput name="lastName" label="Фамилия" placeholder="Пупкин" />
				<FormInput
					name="email"
					label="E-mail"
					placeholder="vasyapup@gmail.com"
				/>
				<FormInput
					name="phone"
					label="Телефон"
					placeholder="+7 (800) 555-35-35"
				/>
			</div>
		</WhiteBlock>
	)
}
