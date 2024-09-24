'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token="cf3e60753c0f117bd421977517c32cbcd59b18b0"
			onChange={data => onChange?.(data?.value)}
		/>
	)
}
