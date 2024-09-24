import { Skeleton } from '@/components/ui'
import React from 'react'

interface Props {
	className?: string
}

export const CheckoutCartItemSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className="flex gap-4">
			<Skeleton className="h-[60px] w-[60px] rounded-full" />

			<div className="">
				<Skeleton className="h-5 w-36 mb-2" />
				<Skeleton className="h-3 w-[350px] mb-1" />
				<Skeleton className="h-3 w-[280px]" />
			</div>
		</div>
	)
}
