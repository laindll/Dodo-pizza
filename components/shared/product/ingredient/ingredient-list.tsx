import { cn } from '@/lib/utils'
import { Ingredient } from '@prisma/client'
import React from 'react'
import { Title } from '../../../ui/text/title'
import { IngredientCard } from './ingredient-card'

interface Props {
	className?: string
	ingredients: Ingredient[]
	selectedIngredient: Set<Number>
	addIngredient: (id: number) => void
}

export const IngredientList: React.FC<Props> = ({
	className,
	ingredients,
	selectedIngredient,
	addIngredient,
}) => {
	return (
		<div className={cn('', className)}>
			<Title size="sm" className="font-bold mb-3">
				Добавить по вкусу
			</Title>
			<div className="grid grid-cols-3 gap-3 max-h-[260px] overflow-auto scrollbar pr-3 pl-7 -ml-7">
				{ingredients.map(
					(ingredient, index) =>
						index < 15 && (
							<IngredientCard
								key={ingredient.id}
								ingredient={ingredient}
								active={selectedIngredient.has(ingredient.id)}
								onClick={addIngredient}
							/>
						)
				)}
			</div>
		</div>
	)
}
