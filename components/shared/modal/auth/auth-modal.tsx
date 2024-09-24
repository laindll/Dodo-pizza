'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { LoginForm } from './form/login-form'
import { RegisterForm } from './form/register-form'

interface Props {
	className?: string
	children?: React.ReactNode
}

export const AuthModal: React.FC<Props> = ({ className, children }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [type, setType] = React.useState<'login' | 'register'>('login')

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<div onClick={() => setIsOpen(true)}>{children}</div>

			<VisuallyHidden.Root>
				<DialogTitle>Вход или регистрация</DialogTitle>
				<DialogDescription>Войдите или зарегистрируйтесь</DialogDescription>
			</VisuallyHidden.Root>

			<DialogContent className="w-[420px] p-7 bg-white overflow-hidden">
				{type === 'login' ? (
					<div className={cn('flex flex-col gap-4')}>
						<LoginForm onClick={() => setType('register')} />

						<Button
							variant="secondary"
							onClick={() =>
								signIn('github', {
									callbackUrl: '/',
									redirect: true,
								})
							}
							type="button"
							className="gap-3 h-11 bg-gray-100 text-black hover:bg-gray-100/90 hover:text-black/90"
						>
							<Image
								height={24}
								width={24}
								alt="GitHub logo"
								src="https://github.githubassets.com/favicons/favicon.svg"
							/>
							Продолжить с GitHub
						</Button>

						<Button
							variant="secondary"
							onClick={() =>
								signIn('google', {
									callbackUrl: '/',
									redirect: true,
								})
							}
							type="button"
							className="gap-3 h-11 bg-blue-100 text-black hover:bg-blue-100/90 hover:text-black/90"
						>
							<Image
								height={24}
								width={24}
								alt="Google logo"
								src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
							/>
							Продолжить с Google
						</Button>
					</div>
				) : (
					<div className={cn('flex flex-col gap-4')}>
						<RegisterForm
							onClick={() => setType('login')}
							onSubmitSet={() => setIsOpen(false)}
						/>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
