'use client'

import { cn } from '@/lib/utils'
import { Loader, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	className?: string
	onClick: (setLoading: React.Dispatch<boolean>) => void
	text?: string
}

export const RemoveButton: React.FC<Props> = ({ className, onClick, text }) => {
	const [loading, setLoading] = useState(false)

	return (
		<div className={className}>
			<div
				onClick={() => onClick(setLoading)}
				className="group flex gap-1 items-center"
			>
				{!loading ? (
					<Trash2Icon
						className="text-gray-400 cursor-pointer transition-colors duration-200 group-hover:text-red-500"
						size={16}
					/>
				) : (
					<Loader className="animate-spin" size={16} />
				)}

				<span
					className={cn(
						'text-gray-400 cursor-pointer transition-colors duration-200',
						!loading && ' group-hover:text-red-500'
					)}
				>
					{text}
				</span>
			</div>
		</div>
	)
}
