import { TCartItem, useCartStore } from '@/store'
import { useEffect } from 'react'

interface I {
	cartItems: TCartItem[]
	totalPrice: number
	loading: boolean
	clearCart: () => Promise<void>
}

export function useCart(): I {
	const [fetchCartItems, clearCart, totalPrice, loading, cartItems] =
		useCartStore(state => [
			state.fetchCartItems,
			state.clearCart,
			state.totalPrice,
			state.loading,
			state.cartItems || [],
		])

	useEffect(() => {
		fetchCartItems()
	}, [fetchCartItems])

	return { cartItems, totalPrice, loading, clearCart }
}
