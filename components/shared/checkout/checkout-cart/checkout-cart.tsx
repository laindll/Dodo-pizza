import { RemoveButton } from '@/components/ui'
import { WhiteBlock } from '@/components/ui/container/white-block'
import { cn } from '@/lib/utils'
import { TCartItem } from '@/store'
import React from 'react'
import { CheckoutCartItem } from './checkout-cart-item'
import { CheckoutCartItemSkeleton } from './checkout-cart-item-skeleton'

interface Props {
	className?: string
	cartItems: TCartItem[]
	clearCart: () => Promise<void>
	totalPrice?: number
}

export const CheckoutCart: React.FC<Props> = ({
	className,
	cartItems,
	clearCart,
	totalPrice,
}) => {
	return (
		<div className="w-full">
			<WhiteBlock
				title="1. Корзина"
				endAdornment={
					<>
						<RemoveButton
							onClick={async (setLoading: React.Dispatch<boolean>) => {
								try {
									setLoading(true)
									await clearCart()
									setLoading(false)
								} catch (err) {
									console.log(err)
								}
							}}
							text={'Очистить корзину'}
						/>
					</>
				}
			>
				{totalPrice === 0 ? (
					<div className={cn('flex flex-col gap-7', className)}>
						{new Array(2).fill(0).map((_, index) => (
							<CheckoutCartItemSkeleton key={index} />
						))}
					</div>
				) : (
					<div className={cn('flex flex-col gap-7', className)}>
						{cartItems?.map(cartItem => (
							<CheckoutCartItem key={cartItem.id} cartItem={cartItem} />
						))}
					</div>
				)}
			</WhiteBlock>
		</div>
	)
}
