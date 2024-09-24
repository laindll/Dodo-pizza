'use client'

import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Input, Skeleton } from '../../ui'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'

type Item = FilterCheckboxProps
interface Props {
	title: string
	items?: Item[]
	defaultItems?: Item[]
	limit?: number
	searchInputPlaceholder?: string
	onChange?: (values: string) => void
	defaultValue: string[]
	className?: string
	loading: Boolean
	selectedIds: Set<string>
}

export const CheckboxList: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	className,
	onChange,
	defaultValue,
	loading,
	selectedIds,
}) => {
	const [showAll, setShowAll] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const list = items || defaultItems || []

	if (loading)
		return (
			<div className={className}>
				<p className="font-bold mb-5">{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton className="h-6 mb-4 rounded-[8px]" key={index} />
					))}
			</div>
		)

	const itemsList = showAll
		? list.filter(item =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: list.slice(0, limit)

	return (
		<div className={cn('', className)}>
			<p className="font-bold mb-5">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
						value={searchValue}
						onChange={event => setSearchValue(event.target.value)}
					/>
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-[300px] pr-2 overflow-auto scrollbar">
				{itemsList.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selectedIds?.has(item.value)}
						onChange={() => onChange?.(item.value)}
					/>
				))}
			</div>

			{list.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						className="text-primary mt-4"
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? 'Скрыть' : 'Показать все'}{' '}
					</button>
				</div>
			)}
		</div>
	)
}
