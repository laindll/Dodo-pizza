import { cn } from '@/lib/utils'
import { Category } from '@prisma/client'
import React from 'react'
import { Container } from '../../ui/container/container'
import { SortPopup } from '../../ui/input/sort-popup'
import { Categories } from './categories'

interface Props {
	className?: string
	categories: Category[]
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
	return (
		<div
			className={cn(
				'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
				className
			)}
		>
			<Container className="flex items-center justify-between">
				<Categories categories={categories} />
				<SortPopup />
			</Container>
		</div>
	)
}
