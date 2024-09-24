import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import React from 'react'
import { Button } from '../button/button'

interface Props {
	className?: string
	value: number
	onClick: (value: number) => void
}

export const CountInput: React.FC<Props> = ({ className, value, onClick }) => {
	return (
		<div
			className={cn(
				'inline-flex items-center justify-between gap-3',
				className
			)}
		>
			<Button
				variant="outline"
				disabled={value === 1}
				onClick={() => onClick(value - 1)}
				type="button"
				className="p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 w-[30px] h-[30px] rounded-[10px]"
			>
				<Minus className="h-4" />
			</Button>
			<b className="text-sm">{value}</b>
			<Button
				variant="outline"
				disabled={value === 10}
				onClick={() => onClick(value + 1)}
				type="button"
				className="p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 w-[30px] h-[30px] rounded-[10px]"
			>
				<Plus className="h-4" />
			</Button>
		</div>
	)
}
