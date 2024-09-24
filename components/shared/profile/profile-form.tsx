'use client'

import { updateUserInfo } from '@/app/actions'
import { Button, Container, FormInput, Title } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { TUpdateForm, updateSchema } from '../modal/auth/form/schema'

interface Props {
	data: User
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(updateSchema),
		defaultValues: {
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone,
			email: data.email,
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TUpdateForm) => {
		try {
			await updateUserInfo({
				email: data.email,
				phone: data.phone,
				firstName: data.firstName,
				lastName: data.lastName,
				password: data.password,
			})

			toast.success('Данные обновлены 📝', {
				position: 'bottom-center',
			})
		} catch (error) {
			return toast.error('Ошибка при обновлении данных', {
				position: 'bottom-center',
			})
		}
	}

	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/',
		})
	}

	return (
		<Container className="my-10">
			<Title size="md" className="font-bold">
				Личные данные{' '}
				<span className="text-neutral-400 font-light">#{data.id}</span>
			</Title>

			<FormProvider {...form}>
				<form
					className="flex flex-col gap-2 w-96 mt-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormInput name="firstName" label="Имя" required />
					<FormInput name="lastName" label="Фамилия" required />
					<FormInput name="phone" label="Телефон" required />
					<FormInput name="email" label="E-mail" required />

					<FormInput type="password" name="password" label="Новый пароль" />
					<FormInput
						type="password"
						name="confirmPassword"
						label="Повторите пароль"
					/>

					<div className="flex flex-col gap-4">
						<Button
							disabled={form.formState.isSubmitting}
							className="text-base mt-2"
							type="submit"
						>
							Сохранить
						</Button>

						<Button
							onClick={onClickSignOut}
							variant="secondary"
							disabled={form.formState.isSubmitting}
							className="text-base"
							type="button"
						>
							Выйти
						</Button>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
