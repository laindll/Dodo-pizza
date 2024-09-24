'use client'

import { Button, Sheet, Title } from '@/components/ui'
import { RemoveButton } from '@/components/ui/button/remove-button'
import {
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/container/sheet'
import { useCart } from '@/hooks/useCart'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CartDrawerItem } from './cart-drawer-item'

interface Props {
	className?: string
	children: React.ReactNode
}

export const CartDrawer: React.FC<Props> = ({ className, children }) => {
	const { cartItems, totalPrice, clearCart } = useCart()

	return (
		<Sheet>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee] gap-0">
				{cartItems.length > 0 ? (
					<>
						<SheetHeader>
							<SheetTitle>
								<div className="flex items-center gap-2">
									<div>
										В корзине{' '}
										<span className="font-bol">
											{cartItems.length} товар(а)
										</span>
									</div>
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
									/>
								</div>
							</SheetTitle>
						</SheetHeader>

						<div className="-mx-6 mt-6 overflow-auto scrollbar flex-1">
							{cartItems?.map(cartItem => (
								<div className="mb-2" key={cartItem.id}>
									<CartDrawerItem key={cartItem.id} cartItem={cartItem} />
								</div>
							))}
						</div>

						<SheetFooter className="-mx-6 bg-white p-8 shadow-[0_0_20px_0_rgba(0,0,0,0.1)]">
							<div className="flex flex-col w-full">
								<div className="w-full">
									<div className="flex mb-4">
										<span className="flex flex-1 text-lg text-neutral-500">
											Итого
											<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
										</span>

										<span className="font-bold text-lg">{totalPrice} ₽</span>
									</div>
								</div>

								<Link href="/checkout">
									<Button type="submit" className="w-full h-12 text-base">
										Оформить заказ
										<ArrowRight className="w-5 ml-2" />
									</Button>
								</Link>
							</div>
						</SheetFooter>
					</>
				) : (
					<div className="flex flex-col items-center justify-center w-72 mx-auto h-full">
						<Image
							src="/assets/images/empty-box.png"
							alt="Empty cart"
							width={120}
							height={120}
						/>

						<Title size="sm" className="text-center font-bold mb-1 mt-4">
							Корзина пустая
						</Title>

						<p className="text-center text-neutral-500 mb-4">
							Добавьте хотя бы одну пиццу, чтобы совершить заказ
						</p>

						<SheetClose>
							<Button className="text-base" size="lg">
								<ArrowLeft className="mr-2" size={16} />
								Вернуться назад
							</Button>
						</SheetClose>
					</div>
				)}
			</SheetContent>
		</Sheet>
	)
}
