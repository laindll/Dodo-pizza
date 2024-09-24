'use client'

import { cn } from '@/lib/utils'
import { useCartStore } from '@/store'
import { Dough, Ingredient, Product, Size, Variant } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSet } from 'react-use'
import { Button, Title } from '../../ui'
import { IngredientList } from './ingredient/ingredient-list'
import { VariantToggle } from './variant-toggle'

interface Props {
	className?: string
	product: Product & {
		variants: Variant[]
		ingredients: Ingredient[]
	}
	sizes: Size[]
	doughs: Dough[]
	ingredients: Ingredient[]
	isDialogue: boolean
	onAddToCart?: () => void
}

export const ProductInfo: React.FC<Props> = ({
	className,
	product,
	sizes,
	doughs,
	ingredients,
	isDialogue,
	onAddToCart,
}) => {
	const [selectedSize, setSelectedSize] = useState(2)
	const [selectedDough, setSelectedDough] = useState(1)
	const selectedVariant =
		product.variants.find(
			variant =>
				variant.sizeId === selectedSize && variant.doughId === selectedDough
		) || product.variants[0]

	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	)

	const productPrice = selectedVariant?.price || product.variants[0].price

	const ingredientPrice = ingredients
		.filter(ingredient => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)

	const price = productPrice + ingredientPrice

	const [addCartItem, loading] = useCartStore(state => [
		state.addCartItem,
		state.loading,
	])
	const addCartItemEventHandler = async () => {
		try {
			await addCartItem({
				variantId: selectedVariant.id,
				ingredients: ingredients.filter(ingredient =>
					selectedIngredients.has(ingredient.id)
				),
				quantity: 1,
			})

			if (isDialogue) onAddToCart?.()

			toast.success('Товар добавлен в корзину', {
				position: 'bottom-center',
				iconTheme: {
					primary: '#ff5e00',
					secondary: 'white',
				},
			})
		} catch (err) {
			console.log(err)
			toast.error('Произошла ошибка при добавлении в корзину', {
				position: 'bottom-center',
			})
		}
	}

	return (
		<div className={cn('flex flex-1 items-center w-full', className)}>
			<div className="flex items-center justify-center w-[50%] h-[490px] pl-5 pt-5">
				<Image
					src={product.imageUrl}
					height={300 + 50 * selectedSize}
					width={300 + 50 * selectedSize}
					alt={product.name}
					className="transition-all duration-300"
				/>
			</div>

			<div className=" flex flex-col bg-gray-50 w-[50%] p-7 rounded-3xl h-full justify-between">
				<div className="mb-7">
					<Title size="md" className="font-extrabold mb-1">
						{product.name}
					</Title>

					<p className="text-gray-400 mb-4">
						{product.ingredients
							.map((ingredient, index) =>
								index > 0 ? ingredient.name.toLowerCase() : ingredient.name
							)
							.join(', ')}
					</p>

					{product.ingredients.length === 0 && (
						<p className="text-gray-400 mb-4">
							Очень вкусное блюдо, наверное. Или напиток... Описания, к
							сожалению, нет, поэтому довольствуйтесь тем, что есть.
						</p>
					)}

					{product.variants.length > 1 && (
						<div>
							<div className="flex flex-col gap-3 mb-4">
								<VariantToggle
									variants={sizes}
									selectedValue={selectedSize}
									onClick={setSelectedSize}
								/>
								<VariantToggle
									variants={doughs}
									selectedValue={selectedDough}
									onClick={setSelectedDough}
								/>
							</div>

							<IngredientList
								ingredients={ingredients}
								selectedIngredient={selectedIngredients}
								addIngredient={addIngredient}
							/>
						</div>
					)}
				</div>

				<div className="py-0">
					<Button
						className="w-full select-none"
						onClick={addCartItemEventHandler}
						loading={loading}
					>
						В корзину за {price} ₽
					</Button>
				</div>
			</div>
		</div>
	)
}
