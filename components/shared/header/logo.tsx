import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
	className?: string
}

export const Logo: React.FC<Props> = ({ className }) => {
	return (
		<Link href="/" className={cn('select-none', className)}>
			<div className="flex items-center gap-4">
				<Image src="/logo.svg" alt="Logo" height={44} width={44} />
				<div>
					<h1 className="text-2xl uppercase font-black leading-none mb-[2px]">
						Додо Пицца
					</h1>
					<p className="text-sm text-gray-400 leading-none">
						есть то, что нас объединяет
					</p>
				</div>
			</div>
		</Link>
	)
}
