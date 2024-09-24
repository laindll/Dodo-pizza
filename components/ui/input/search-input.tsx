'use client'

import { cn } from '@/lib/utils'
import { Api } from '@/services/api-clients'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDebounce } from 'react-use'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [focused, setFocused] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [products, setProducts] = useState<Product[]>([])

	useDebounce(
		() => {
			if (searchQuery) {
				Api.products.search(searchQuery).then(products => {
					setProducts(products)
				})
			}
		},
		250,
		[searchQuery]
	)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<div className={className}>
			{focused && (
				<div
					className="fixed top-0 left-0 bottom-0 right-0 bg-black/40 z-20"
					onClick={() => setFocused(false)}
				/>
			)}

			<div className="flex rounded-2xl flex-1 justify-between relative h-11 z-20">
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
				<input
					className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
					type="text"
					placeholder="Поиск..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={event => setSearchQuery(event.target.value)}
				/>

				<div
					className={cn(
						'absolute w-full bg-white rounded-xl p-2 top-16 shadow-md transition-all duration-200 invisible opacity-0',
						focused &&
							searchQuery &&
							products.length > 0 &&
							'visible opacity-100 top-14'
					)}
				>
					{products.map((product, index) => (
						<Link
							href={`/product/${product.id}`}
							key={index}
							onClick={onClickItem}
						>
							<div className="flex items-center gap-4 px-3 py-2 hover:bg-secondary rounded-l">
								<Image
									src={product.imageUrl}
									alt={product.name}
									width={40}
									height={40}
								/>
								{product.name}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
