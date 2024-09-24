import { z } from 'zod'

export const checkoutSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'Поле должно содержать не менее 2-х символов' }),
	lastName: z
		.string()
		.min(2, { message: 'Поле должно содержать не менее 2-х символов' }),
	email: z.string().email({ message: 'Введите корректную почту' }),
	phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
	address: z.string().min(2, { message: 'Введите корректный адрес' }),
	comment: z.string().optional(),
})

export type TCheckoutForm = z.infer<typeof checkoutSchema>
