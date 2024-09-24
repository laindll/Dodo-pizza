import { cn } from '@/lib/utils'
import { Ingredient } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface Props {
	className?: string
	ingredient: Ingredient
	active: Boolean
	onClick: (id: number) => void
}

export const IngredientCard: React.FC<Props> = ({
	className,
	ingredient,
	active,
	onClick,
}) => {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-between gap-1 p-3 rounded-xl bg-white transition-all duration-300 hover:shadow-[0_0_20px_0_rgba(0,0,0,0.07)] cursor-pointer border border-white select-none',
				{ 'border-primary': active },
				className
			)}
			onClick={() => onClick(ingredient.id)}
		>
			<div className="flex flex-col gap-2">
				<Image
					src={ingredient.imageUrl}
					alt={ingredient.name}
					width={80}
					height={80}
					className="w-[100px]"
				/>
				<p className="text-[14px] font-light text-center">{ingredient.name}</p>
			</div>
			<p className="block w-full text-center">{ingredient.price} ₽</p>
		</div>
	)
}
