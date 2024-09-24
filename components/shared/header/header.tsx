'use client'

import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { CartButton, Container, ProfileButton, SearchInput } from '../../ui'
import { Logo } from './logo'

interface Props {
	className?: string
	hasSearch?: boolean
	hasCart?: boolean
}

export const Header: React.FC<Props> = ({
	className,
	hasSearch = true,
	hasCart = true,
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	React.useEffect(() => {
		let toastMessage = ''

		if (searchParams.has('paid')) {
			toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					position: 'top-center',
					duration: 4000,
				})
			}, 500)
		}
	})

	return (
		<header className={cn('border-b', className)}>
			<Container className="flex items-center justify-between py-8">
				<Logo />

				{hasSearch && (
					<div className="mx-[50px] flex-1">
						<SearchInput />
					</div>
				)}

				<div className="flex items-center gap-3">
					<ProfileButton />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
