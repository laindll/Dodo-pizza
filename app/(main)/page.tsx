import { Filters, ProductList, TopBar } from '@/components/shared'
import { Container, Title } from '@/components/ui'
import { getCategories, searchParams } from '@/lib/utils'
import { prisma } from '@/prisma/prisma-client'
import { Suspense } from 'react'

export default async function Home({
	searchParams,
}: {
	searchParams: searchParams
}) {
	const categories = await getCategories(searchParams)

	const sizes = await prisma.size.findMany()
	const doughs = await prisma.dough.findMany()
	const ingredients = await prisma.ingredient.findMany()

	return (
		<>
			<Container className="mt-10">
				<Title size="lg" className="font-extrabold">
					Меню
				</Title>
			</Container>

			<TopBar categories={categories} />

			<Container className="pb-14 mt-9">
				<div className="flex gap-[80px]">
					<div className="w-[250px]">
						<Suspense>
							<Filters />
						</Suspense>
					</div>
					<div className="flex-1">
						{categories.map(category => (
							<ProductList
								products={category.products}
								sizes={sizes}
								doughs={doughs}
								ingredients={ingredients}
								title={category.name}
								categoryId={category.id}
								key={category.id}
							/>
						))}
					</div>
				</div>
			</Container>
		</>
	)
}
