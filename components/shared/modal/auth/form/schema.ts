import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(4, { message: 'Введите корректный пароль' })

export const loginSchema = z.object({
	email: z.string().email({ message: 'Введите корректную почту' }),
	password: passwordSchema,
})

export const registerSchema = z
	.object({
		email: z.string().email({ message: 'Введите корректную почту' }),
		phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
		firstName: z
			.string()
			.min(2, { message: 'Поле должно содержать не менее 2-х символов' }),
		lastName: z
			.string()
			.min(2, { message: 'Поле должно содержать не менее 2-х символов' }),
		password: z.string().min(4, { message: 'Введите корректный пароль' }),
		confirmPassword: z
			.string()
			.min(4, { message: 'Введите корректный пароль' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export const updateSchema = z
	.object({
		email: z.string().email({ message: 'Введите корректную почту' }),
		phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
		firstName: z
			.string()
			.min(2, { message: 'Поле должно содержать не менее 2-х символов' }),
		lastName: z
			.string()
			.min(2, { message: 'Поле должно содержать не менее 2-х символов' }),
		password: z.string().min(0, { message: 'Введите корректный пароль' }),
		confirmPassword: z
			.string()
			.min(0, { message: 'Введите корректный пароль' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export type TLoginForm = z.infer<typeof loginSchema>
export type TRegisterForm = z.infer<typeof registerSchema>
export type TUpdateForm = z.infer<typeof updateSchema>
