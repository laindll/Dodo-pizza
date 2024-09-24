import { Api } from '@/services/api-clients'
import {
	Cart,
	CartItem,
	Dough,
	Ingredient,
	Product,
	Size,
	Variant,
} from '@prisma/client'
import { create } from 'zustand'

export interface CartState {
	loading: boolean
	error: boolean
	totalPrice: number
	cartItems: TCartItem[]
	fetchCartItems: () => Promise<void>
	clearCart: () => Promise<void>
	updateCartItemQuantity: (id: number, quantity: number) => Promise<void>
	addCartItem: (cartItem: TItem) => Promise<void>
	removeCartItem: (id: number) => Promise<void>
}

export type TCartItem = CartItem & {
	variant: Variant & { product: Product; size: Size; dough: Dough }
	ingredients: Ingredient[]
}
export type TCart = Cart & { cartItems: TCartItem[] }

export type TItem = {
	variantId: number
	ingredients: Ingredient[]
	quantity: number
}

export const useCartStore = create<CartState>((set, get) => ({
	loading: false,
	error: false,
	totalPrice: 0,
	cartItems: [],

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.getCart()
			set({ totalPrice: data.totalPrice, cartItems: data.cartItems })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	clearCart: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.clearCart()
			set({ cartItems: data.cartItems, totalPrice: data.totalPrice })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	updateCartItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.updateCartItemQuantity(id, quantity)
			set({ cartItems: data.cartItems, totalPrice: data.totalPrice })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(state => ({
				loading: true,
				error: false,
				cartItems: state.cartItems.map(item =>
					item.id === id ? { ...item, disabled: true } : item
				),
			}))
			const data = await Api.cart.removeCartItem(id)
			set({ cartItems: data.cartItems, totalPrice: data.totalPrice })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set(state => ({
				loading: false,
				cartItems: state.cartItems.map(item => ({ ...item, disabled: false })),
			}))
		}
	},

	addCartItem: async (cartItem: TItem) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.addCartItem(cartItem)
			set({ cartItems: data.cartItems, totalPrice: data.totalPrice })
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
