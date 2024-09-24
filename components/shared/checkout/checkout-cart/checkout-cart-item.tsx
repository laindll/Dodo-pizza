import { CountInput, RemoveButton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { TCartItem, useCartStore } from '@/store'
import Image from 'next/image'
import React from 'react'
import { useDebounce } from 'react-use'

interface Props {
	className?: string
	cartItem: TCartItem
}

export const CheckoutCartItem: React.FC<Props> = ({ className, cartItem }) => {
	const [count, setCount] = React.useState(cartItem.quantity)
	const price =
		((cartItem?.variant?.price || 0) +
			(cartItem?.ingredients?.reduce(
				(acc, ingredient) => acc + ingredient.price,
				0
			) || 0)) *
		count

	const [updateCartItemQuantity, removeCartItem] = useCartStore(state => [
		state.updateCartItemQuantity,
		state.removeCartItem,
	])

	useDebounce(
		() => {
			if (count !== cartItem.quantity) {
				updateCartItemQuantity(cartItem.id, count)
			}
		},
		500,
		[count]
	)

	return (
		<div className={cn(className, 'w-full')}>
			<div
				className={cn(
					'flex bg-white space-between w-full items-center justify-between',
					className
				)}
			>
				<div className="flex gap-6 max-w-[400px] w-full">
					<Image
						src={cartItem?.variant?.product?.imageUrl || ''}
						alt={cartItem?.variant?.product?.name + ' image'}
						width={90}
						height={90}
						className="w-[60px] h-[60px]"
					/>

					<div className="">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold leading-6">
								{cartItem?.variant?.product?.name}
							</h2>
						</div>

						{cartItem.variant.product.categoryId === 1 && (
							<p className="text-xs text-gray-400">
								{cartItem?.variant?.size?.name} (
								{cartItem?.variant?.size?.value} см),{' '}
								{cartItem?.variant?.dough?.name.toLowerCase()} тесто
								{cartItem.ingredients.length > 0 && (
									<span>
										{' '}
										+{' '}
										{cartItem?.ingredients
											?.map(ingredient => ingredient?.name.toLowerCase())
											.join(', ')}
									</span>
								)}
							</p>
						)}
					</div>
				</div>

				<h2 className="font-bold">{price} ₽</h2>

				<div className="flex items-center justify-between select-none gap-4">
					<CountInput value={count} onClick={setCount} />

					<div className="flex items-center gap-3">
						<RemoveButton
							onClick={async (setLoading: React.Dispatch<boolean>) => {
								try {
									setLoading(true)
									await removeCartItem(cartItem.id)
									setLoading(false)
								} catch (err) {
									console.log(err)
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
