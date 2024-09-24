'use client'

import { CartDrawer } from '@/components/shared'
import { useCartStore } from '@/store'
import { ArrowRight, Loader, ShoppingCart } from 'lucide-react'
import React from 'react'

interface Props {
	className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const [totalPrice, amount, loading] = useCartStore(state => [
		state.totalPrice,
		(state.cartItems || []).length,
		state.loading,
	])

	return (
		<CartDrawer>
			<div className="flex group relative items-center justify-center whitespace-nowrap rounded-md active:translate-y-[1px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' bg-primary text-primary-foreground hover:bg-primary/90 h-10 min-w-[113px] px-4 py-2">
				{loading && totalPrice === 0 ? (
					<Loader className="animate-spin " size={16} />
				) : (
					<b>{totalPrice} ₽</b>
				)}
				<span className="h-full w-[1px] bg-white/30 mx-3" />
				<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
					<ShoppingCart strokeWidth={2} className="w-4 h-4 relative mr-1" />

					{loading && totalPrice === 0 ? (
						<Loader className="animate-spin" size={16} />
					) : (
						<b>{amount}</b>
					)}
				</div>
				<ArrowRight className="w-4 absolute right-6 transition duration-300 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
			</div>
		</CartDrawer>
	)
}
