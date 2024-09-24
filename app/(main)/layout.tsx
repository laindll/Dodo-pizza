import { Footer, Header } from '@/components/shared'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Dodo Pizza | Главная',
	description: 'Pet project on Next.js',
}

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<SpeedInsights />
			<Suspense>
				<Header />
			</Suspense>

			<main className="min-h-screen">{children}</main>
			<Footer />
		</>
	)
}
