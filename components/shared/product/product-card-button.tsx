'use client'

import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	className?: string
	addCartItemEventHandler: (setLoading: React.Dispatch<boolean>) => void
}

export const ProductCardButton: React.FC<Props> = ({
	className,
	addCartItemEventHandler,
}) => {
	let [loading, setLoading] = useState(false)

	return (
		<div className={className}>
			<Button
				variant="secondary"
				className="text-base font-bold"
				onClick={() => addCartItemEventHandler(setLoading)}
				loading={loading}
			>
				<Plus className="mr-1" size={20} />
				Добавить
			</Button>
		</div>
	)
}
