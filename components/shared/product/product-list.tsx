'use client'

import { Title } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store'
import { useCategoryStore } from '@/store/category'
import { Dough, Ingredient, Product, Size, Variant } from '@prisma/client'
import React from 'react'
import { useIntersection } from 'react-use'
import { ProductCard } from './product-card'

interface Props {
	title?: string
	listClassName?: string
	categoryId: number
	className?: string
	products: (Product & {
		variants: Variant[]
		ingredients: Ingredient[]
	})[]
	sizes: Size[]
	doughs: Dough[]
	ingredients: Ingredient[]
}

export const ProductList: React.FC<Props> = ({
	title = '',
	products,
	className,
	categoryId,
	listClassName,
	sizes,
	doughs,
	ingredients,
}) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	})

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [intersection?.isIntersecting, categoryId, setActiveCategoryId])

	const [addCartItem] = useCartStore(state => [state.addCartItem])

	return (
		<div
			className={cn('mb-10 scroll-mt-[125px]', className)}
			ref={intersectionRef}
			id={title}
		>
			{products.length > 0 && (
				<div>
					<Title size="lg" className="font-extrabold mb-5">
						{title}
					</Title>
					<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
						{products.map((product, index) => (
							<ProductCard
								product={product}
								sizes={sizes}
								doughs={doughs}
								ingredients={ingredients}
								key={index}
								addCartItem={addCartItem}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
