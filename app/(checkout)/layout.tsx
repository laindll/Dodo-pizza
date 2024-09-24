import { Header } from '@/components/shared'
import { Container } from '@/components/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Dodo Pizza | Checkout',
	description: 'Pet project for Next.js',
}

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className=" bg-[#F4F1EE]">
			<Container>
				<Suspense>
					<Header hasCart={false} hasSearch={false} />
				</Suspense>

				<main className="min-h-screen">{children}</main>
			</Container>
		</div>
	)
}
