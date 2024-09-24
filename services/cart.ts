import { TCart, TItem } from '@/store'
import { ApiRoutes } from './constants'
import { axiosInstance } from './instance'

export const getCart = async (): Promise<TCart> => {
	const { data } = await axiosInstance.get<TCart>(ApiRoutes.CART)

	return data
}

export const updateCartItemQuantity = async (
	cartItemId: number,
	quantity: number
): Promise<TCart> => {
	const { data } = await axiosInstance.patch<TCart>(
		ApiRoutes.CART + '/' + cartItemId,
		{ quantity }
	)

	return data
}

export const removeCartItem = async (cartItemId: number): Promise<TCart> => {
	const { data } = await axiosInstance.delete<TCart>(
		ApiRoutes.CART + '/' + cartItemId
	)

	return data
}

export const addCartItem = async (cartItem: TItem): Promise<TCart> => {
	const { data } = await axiosInstance.post<TCart>(ApiRoutes.CART, cartItem)

	return data
}

export const clearCart = async (): Promise<TCart> => {
	const { data } = await axiosInstance.delete<TCart>(ApiRoutes.CART)

	return data
}
