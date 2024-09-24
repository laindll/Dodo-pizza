import { cn } from '@/lib/utils'
import { TItem } from '@/store'
import { Dough, Ingredient, Product, Size, Variant } from '@prisma/client'
import { ExternalLinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { Title } from '../../ui/text/title'
import { ProductModal } from '../modal/product-modal'
import { ProductCardButton } from './product-card-button'

interface Props {
	className?: string
	product: Product & {
		variants: Variant[]
		ingredients: Ingredient[]
	}
	sizes: Size[]
	doughs: Dough[]
	ingredients: Ingredient[]
	addCartItem: (cartItem: TItem) => void
}

export const ProductCard: React.FC<Props> = ({
	className,
	product,
	sizes,
	doughs,
	ingredients,
	addCartItem,
}) => {
	const addCartItemEventHandler = async (
		setLoading: React.Dispatch<boolean>
	) => {
		try {
			setLoading(true)
			await addCartItem({
				variantId:
					product.variants.length > 1
						? product.variants[2].id
						: product.variants[0].id,
				ingredients: [],
				quantity: 1,
			})
			setLoading(false)
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
		<div className={cn('flex flex-col h-full justify-between', className)}>
			<ProductModal
				product={product}
				sizes={sizes}
				doughs={doughs}
				ingredients={ingredients}
				className="text-left"
			>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<Image
						className="w-[215px] h-[215px]"
						src={product.imageUrl}
						alt="Logo"
						width={215}
						height={215}
					/>
				</div>

				<Title
					size="sm"
					className="flex justify-between mb-1 mt-3 font-bold w-full text-left gap-2"
				>
					{product.name}
					<Link href={`/product/${product.id}`} className="pt-[7px]">
						<ExternalLinkIcon
							className="ml-1 text-primary transition-colors duration-200 hover:text-primary/70"
							size={20}
						/>
					</Link>
				</Title>
			</ProductModal>

			<div>
				<p className="text-sm text-gray-400">
					{product.ingredients
						.map((ingredient, index) =>
							index > 0 ? ingredient.name.toLowerCase() : ingredient.name
						)
						.join(', ')}
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						от <b>{product.variants[0].price} ₽</b>
					</span>

					<ProductCardButton
						addCartItemEventHandler={addCartItemEventHandler}
					/>
				</div>
			</div>
		</div>
	)
}
