import { Button, Skeleton } from '@/components/ui'
import { WhiteBlock } from '@/components/ui/container/white-block'
import { cn } from '@/lib/utils'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import React from 'react'

interface Props {
	className?: string
	totalPrice: number
	loading: boolean
	submitting: boolean
}

const VAT = 0.05
const DELIVERY_PRICE = 150

export const CheckoutInfo: React.FC<Props> = ({
	className,
	totalPrice,
	loading,
	submitting,
}) => {
	return (
		<WhiteBlock className={cn('p-2 sticky top-11', className)}>
			<div className="flex flex-col mb-7">
				<span className="text-[1.2rem]">Итого:</span>

				<span className="h-8 text-[1.8rem] font-extrabold">
					{loading || totalPrice === 0 ? (
						<Skeleton className="mt-2 h-8 w-28" />
					) : (
						<>{Math.floor(totalPrice * (1 + VAT)) + DELIVERY_PRICE} ₽</>
					)}
				</span>
			</div>

			<div className={cn('flex mb-4', className)}>
				<span className="flex flex-1 text-[1.075rem] text-neutral-500">
					<div className="flex items-center">
						<Package size={18} className="mr-2 text-gray-400" />
						Стоимость корзины
					</div>
					<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
				</span>

				<span className="font-bold text-[1.075rem]">
					{loading || totalPrice === 0 ? (
						<Skeleton className="w-20 h-6" />
					) : (
						<>{totalPrice} ₽</>
					)}
				</span>
			</div>

			<div className={cn('flex mb-4', className)}>
				<span className="flex flex-1 text-[1.075rem] text-neutral-500">
					<div className="flex items-center">
						<Percent size={18} className="mr-2 text-gray-400" />
						Налоги:
					</div>
					<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
				</span>

				<span className="font-bold text-[1.075rem]">
					{loading || totalPrice === 0 ? (
						<Skeleton className="w-14 h-6" />
					) : (
						<>{Math.floor(totalPrice * VAT)} ₽</>
					)}
				</span>
			</div>

			<div className={cn('flex mb-4', className)}>
				<span className="flex flex-1 text-[1.075rem] text-neutral-500">
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-400" />
						Доставка:
					</div>
					<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
				</span>

				<span className="font-bold text-[1.075rem]">{DELIVERY_PRICE} ₽</span>
			</div>

			<Button
				type="submit"
				className="w-full h-12 rounded-2xl text-base font-bold mt-6"
				loading={submitting}
			>
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	)
}
