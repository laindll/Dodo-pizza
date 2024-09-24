import { cn } from '@/lib/utils'
import { Dough, Size } from '@prisma/client'
import React from 'react'

interface Props {
	className?: string
	variants: readonly Dough[] | readonly Size[]
	selectedValue?: Dough['id'] | Size['id']
	onClick?: React.Dispatch<React.SetStateAction<number>>
}

export const VariantToggle: React.FC<Props> = ({
	className,
	variants,
	selectedValue,
	onClick = () => {},
}) => {
	return (
		<div
			className={cn(
				'flex justify-between bg-[#f3f3f7] rounded-3xl select-none p-[5px]',
				className
			)}
		>
			{variants.map(variant => (
				<button
					onClick={() => onClick(variant.id)}
					key={variant.id}
					className={cn(
						'flex items-center justify-center cursor-pointer h-[35px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
						variant.id === selectedValue && 'bg-white shadow'
					)}
				>
					{variant.name}
				</button>
			))}
		</div>
	)
}
