'use client'

import { useIngredients } from '@/hooks/useIngredients'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import React, { useEffect, useRef, useState } from 'react'
import { Input, RangeSlider } from '../../ui'
import { Title } from '../../ui/text/title'
import { CheckboxList } from './checkbox-list'

interface Props {
	className?: string
}

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryProps extends PriceProps {
	ingredients: Set<string>
}

export const Filters: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryProps,
		string
	>

	const { ingredients, loading, selectedIds, onSelect } = useIngredients(
		searchParams.get('ingredients')?.split(',') || []
	)
	const [price, setPrice] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	const items = ingredients.map(ingredient => ({
		text: ingredient.name,
		value: String(ingredient.id),
	}))

	const isMounted = useRef(false)

	useEffect(() => {
		if (isMounted.current) {
			const filters = {
				...price,
				ingredients: Array.from(selectedIds),
			}

			const query = qs.stringify(filters, { arrayFormat: 'comma' })

			router.push(`?${query}`, {
				scroll: false,
			})

			console.log(filters)
		}

		isMounted.current = true
	}, [price, selectedIds, router])

	return (
		<div className={className}>
			<Title size="sm" className="mb-5 font-bold">
				Фильтры
			</Title>

			<div className="border-b border-b-neutral-100 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						step={10}
						value={price.priceFrom}
						onChange={e =>
							setPrice({ ...price, priceFrom: Number(e.target.value) })
						}
					/>
					<Input
						type="number"
						placeholder="3000"
						min={100}
						max={3000}
						step={10}
						value={price.priceTo}
						onChange={e =>
							setPrice({ ...price, priceTo: Number(e.target.value) })
						}
					/>
				</div>

				<RangeSlider
					min={0}
					max={3000}
					step={10}
					value={[price.priceFrom || 0, price.priceTo || 3000]}
					onValueChange={([priceFrom, priceTo]) =>
						setPrice({ priceFrom, priceTo })
					}
				/>
			</div>

			<CheckboxList
				title={'Ингридиенты'}
				className="mt-5"
				limit={5}
				items={items}
				defaultItems={[]}
				defaultValue={[]}
				loading={loading}
				onChange={onSelect}
				selectedIds={selectedIds}
			/>
		</div>
	)
}
