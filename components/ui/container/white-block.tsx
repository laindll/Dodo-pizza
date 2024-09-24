import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from '../text/title'

interface Props {
	title?: string
	endAdornment?: React.ReactNode
	className?: string
	contentClassName?: string
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
	title,
	endAdornment,
	className,
	contentClassName,
	children,
}) => {
	return (
		<div className={cn('flex flex-col w-full bg-white rounded-3xl', className)}>
			{title && (
				<div className="flex items-center justify-between p-7 border-b border-gray-100">
					<Title size="sm" className="font-bold text-2xl">
						{title}
					</Title>
					{endAdornment}
				</div>
			)}

			<div className={cn('p-7', contentClassName)}>{children}</div>
		</div>
	)
}
