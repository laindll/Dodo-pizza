'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTrigger,
} from '@/components/ui'
import { Dough, Ingredient, Product, Size, Variant } from '@prisma/client'
import { DialogTitle } from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import React from 'react'
import { ProductInfo } from '../product/product-info'

interface Props {
	className?: string
	children?: React.ReactNode
	product: Product & {
		variants: Variant[]
		ingredients: Ingredient[]
	}
	sizes: Size[]
	doughs: Dough[]
	ingredients: Ingredient[]
}

export const ProductModal: React.FC<Props> = ({
	className,
	children,
	product,
	sizes,
	doughs,
	ingredients,
}) => {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<VisuallyHidden.Root>
				<DialogTitle>{product.name}</DialogTitle>
				<DialogDescription></DialogDescription>
			</VisuallyHidden.Root>
			<DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
				<ProductInfo
					product={product}
					sizes={sizes}
					doughs={doughs}
					ingredients={ingredients}
					isDialogue={true}
					onAddToCart={() => setIsOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	)
}
