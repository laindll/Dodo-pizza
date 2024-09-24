import { Button, FormInput, Title } from '@/components/ui'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { loginSchema, TLoginForm } from './schema'

interface Props {
	className?: string
	onClick: () => void
}

export const LoginForm: React.FC<Props> = ({ className, onClick }) => {
	const form = useForm<TLoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: TLoginForm) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			})

			if (!resp?.ok) {
				throw Error()
			}

			toast.success('Вы успешно вошли в аккаунт', {
				position: 'bottom-center',
			})
		} catch (err) {
			console.log('[LOGIN_ERROR]', err)
			toast.error('Не удалось войти в аккаунт', {
				position: 'bottom-center',
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className={cn('flex flex-col gap-2', className)}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex justify-between items-center mb-4">
					<div className="mr-2">
						<Title size="md" className="font-bold">
							Вход в аккаунт
						</Title>
						<p className="text-gray-400 text-sm">
							Введите свою почту и пароль, чтобы войти
						</p>
					</div>
				</div>

				<FormInput name="email" label="E-mail" required />
				<FormInput name="password" label="Пароль" type="password" required />

				<div className="flex flex-col gap-1">
					<div className="flex justify-between">
						<span className="text-neutral-500 cursor-pointer">
							Забыли пароль?
						</span>
						<span
							onClick={onClick}
							className="block text-primary transition-colors duration-200 hover:text-primary/90 cursor-pointer"
						>
							Создать аккаунт
						</span>
					</div>
					<Button
						loading={form.formState.isSubmitting}
						className="h-11 text-base mt-2"
						type="submit"
					>
						Войти
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}
