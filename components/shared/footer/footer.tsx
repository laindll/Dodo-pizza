import { cn } from '@/lib/utils'
import { Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Container } from '../../ui'

interface Props {
	className?: string
}

export const Footer: React.FC<Props> = ({ className }) => {
	return (
		<footer className={cn('border-t mt-20', className)}>
			<Container className="flex items-center justify-between py-8">
				<div className="flex gap-4 items-center">
					<h1 className="text-lg uppercase font-black leading-none mb-[2px]">
						Додо Пицца
					</h1>
					<span className="text-md">© 2024</span>
				</div>

				<div className="flex items-center gap-3">
					<Link
						href="https://www.facebook.com/dodopizzaby/"
						className="block bg-secondary/50 p-2 rounded-[5px]"
						target="_blank"
					>
						<Facebook size={16} className="text-primary" />
					</Link>
					<Link
						href="https://www.instagram.com/dodopizza_belarus"
						className="block bg-secondary/50 p-2 rounded-[5px]"
						target="_blank"
					>
						<Instagram size={16} className="text-primary" />
					</Link>
				</div>
			</Container>
		</footer>
	)
}
