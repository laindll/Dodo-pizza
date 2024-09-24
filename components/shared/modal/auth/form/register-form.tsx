import { registerUser } from '@/app/actions'
import { Button, FormInput, Title } from '@/components/ui'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { registerSchema, TRegisterForm } from './schema'

interface Props {
	className?: string
	onClick: () => void
	onSubmitSet: () => void
}

export const RegisterForm: React.FC<Props> = ({
	className,
	onClick,
	onSubmitSet,
}) => {
	const form = useForm<TRegisterForm>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TRegisterForm) => {
		try {
			await registerUser({
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				password: data.password,
				phone: data.phone,
			})

			onSubmitSet?.()

			toast.success('Регистрация прошла успешна 📝. Подтвердите свою почту', {
				position: 'bottom-center',
			})
		} catch (error) {
			return toast.error('При регистрации возникла ошибка', {
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
						<Title size="md" className="font-bold flex gap-2 items-center">
							<ArrowLeft
								size={21}
								onClick={onClick}
								className="transition-colors duration-200 hover:text-primary cursor-pointer"
							/>
							Регистрация
						</Title>
						<p className="text-gray-400 text-sm">Заполните поля ниже</p>
					</div>
				</div>

				<FormInput name="firstName" label="Имя" required />
				<FormInput name="lastName" label="Фамилия" required />
				<FormInput name="phone" label="Телефон" required />
				<FormInput name="email" label="E-mail" required />
				<FormInput name="password" label="Пароль" type="password" required />
				<FormInput
					name="confirmPassword"
					label="Пароль еще раз"
					type="password"
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className="h-11 text-base mt-2"
					type="submit"
				>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	)
}
