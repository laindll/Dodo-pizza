import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dodo Pizza | Dashboard',
	description: 'Pet project for Next.js',
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
